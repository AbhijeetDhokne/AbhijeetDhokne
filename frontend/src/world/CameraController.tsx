// Cinematic camera director. Travel requests dispatch from nav menus, island
// clicks, or keyboard shortcuts; GSAP tweens the camera between authored poses
// from the navigation chart. Pointer parallax + slow autonomous drift keep the
// world alive between travels. Reduced-motion and skip requests resolve travel
// instantly.

import { useEffect, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { useIslands } from '../state/useIslands';
import { OVERVIEW_CAMERA, islandById } from '../data/navigation';
import { useReducedMotion } from '../hooks/device';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fit distance for an island's framing box at the current viewport aspect.
 * Keeps the authored viewing direction; only the zoom adapts, so the island
 * fills the frame without cropping on wide and narrow screens alike.
 */
const fitDistance = (cam: THREE.PerspectiveCamera, width: number, height: number, zoom = 1): number => {
  const vHalf = THREE.MathUtils.degToRad(cam.fov / 2);
  const hHalf = Math.atan(Math.tan(vHalf) * cam.aspect);
  const need = Math.max(height / 2 / Math.tan(vHalf), width / 2 / Math.tan(hHalf));
  return THREE.MathUtils.clamp((need * 1.7 + 6) * zoom, 15, 75);
};

const CameraController = () => {
  const { camera } = useThree();
  const { travelRequest, markArrived, setTraveling, skipNonce } = useIslands();
  const reduced = useReducedMotion();

  const basePos = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.position));
  const baseTarget = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.target));
  const smoothPos = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.position));
  const smoothTarget = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.target));
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const tween = useRef<gsap.core.Tween | null>(null);
  const travelingRef = useRef(false);
  const nonceRef = useRef(travelRequest.nonce);
  const reducedRef = useRef(reduced);

  const api = useMemo(
    () => ({ markArrived, setTraveling }),
    [markArrived, setTraveling],
  );
  const apiRef = useRef(api);

  // Keep mutable refs in sync without writing during render.
  useEffect(() => {
    reducedRef.current = reduced;
    apiRef.current = api;
  }, [reduced, api]);

  // Initial framing (fov comes from the Canvas camera prop).
  useEffect(() => {
    camera.position.copy(basePos.current);
    camera.lookAt(baseTarget.current);
  }, [camera]);

  // Pointer parallax (normalized -1..1), passive listeners only.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Travel timeline.
  useEffect(() => {
    if (travelRequest.nonce === nonceRef.current && travelRequest.nonce !== 0) return;
    nonceRef.current = travelRequest.nonce;
    if (travelRequest.nonce === 0) return;

    const dest = travelRequest.dest;
    let pose: { position: [number, number, number]; target: [number, number, number] };
    if (dest === 'overview') {
      pose = {
        position: [...OVERVIEW_CAMERA.position],
        target: [...OVERVIEW_CAMERA.target],
      };
    } else {
      // Authored three-quarter direction, responsive zoom from the framing box.
      // The island is then placed at its authored NDC slot (default: centered,
      // slightly low so the top navbar never covers it) by shifting the
      // look-target opposite to the desired screen offset.
      const isl = islandById(dest);
      const cam = camera as THREE.PerspectiveCamera;
      const vHalf = THREE.MathUtils.degToRad(cam.fov / 2);
      const hHalf = Math.atan(Math.tan(vHalf) * cam.aspect);
      const target = new THREE.Vector3(...isl.camera.target);
      const dir = new THREE.Vector3(...isl.camera.position).sub(target).normalize();
      const dist = fitDistance(cam, isl.frame.width, isl.frame.height, isl.frame.zoom ?? 1);
      const ox = isl.frame.ox ?? 0;
      const oy = isl.frame.oy ?? -0.15;
      const right = new THREE.Vector3().crossVectors(dir.clone().negate(), new THREE.Vector3(0, 1, 0)).normalize();
      const p = target.clone().addScaledVector(dir, dist);
      const t = target
        .clone()
        .addScaledVector(new THREE.Vector3(0, 1, 0), -oy * dist * Math.tan(vHalf))
        .addScaledVector(right, -ox * dist * Math.tan(hHalf));
      pose = { position: [p.x, p.y, p.z], target: [t.x, t.y, t.z] };
    }

    const setArrived = () => {
      basePos.current.set(...pose.position);
      baseTarget.current.set(...pose.target);
      smoothPos.current.copy(basePos.current);
      smoothTarget.current.copy(baseTarget.current);
      apiRef.current.markArrived(travelRequest.dest);
    };

    if (reducedRef.current) {
      tween.current?.kill();
      setArrived();
      return;
    }

    apiRef.current.setTraveling(true);
    travelingRef.current = true;
    tween.current?.kill();

    const fromPos = { x: basePos.current.x, y: basePos.current.y, z: basePos.current.z };
    const fromTg = { x: baseTarget.current.x, y: baseTarget.current.y, z: baseTarget.current.z };
    const proxy = { ...fromPos, ...{ tx: fromTg.x, ty: fromTg.y, tz: fromTg.z } };

    tween.current = gsap.to(proxy, {
      x: pose.position[0],
      y: pose.position[1],
      z: pose.position[2],
      tx: pose.target[0],
      ty: pose.target[1],
      tz: pose.target[2],
      duration: 2.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        basePos.current.set(proxy.x, proxy.y, proxy.z);
        baseTarget.current.set(proxy.tx, proxy.ty, proxy.tz);
      },
      onComplete: () => {
        travelingRef.current = false;
        apiRef.current.markArrived(travelRequest.dest);
      },
    });
    // Keep a reference so the skip effect can finish the flight.
    const active = tween.current;
    return () => {
      // Do not kill on unmount mid-flight bookkeeping; cleanup only replaces.
      if (tween.current !== active) active.kill();
    };
  }, [travelRequest, camera]);

  // Accessibility: skip finishes the current flight immediately.
  useEffect(() => {
    if (skipNonce === 0) return;
    const tw = tween.current;
    if (tw) tw.progress(1);
  }, [skipNonce]);

  // Per-frame: ease toward base pose with parallax + drift layered on top.
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const still = reducedRef.current;
    const drift = still ? 0 : 1;
    const px = pointer.current.x;
    const py = pointer.current.y;

    const desired = new THREE.Vector3(
      basePos.current.x + px * 1.6 * drift,
      basePos.current.y + py * 1.0 * drift + Math.sin(t * 0.18) * 0.35 * drift - scroll.current * 2,
      basePos.current.z,
    );
    const desiredTarget = new THREE.Vector3(
      baseTarget.current.x + px * 0.9 * drift,
      baseTarget.current.y + py * 0.6 * drift,
      baseTarget.current.z,
    );

    const k = travelingRef.current ? 0.12 : 0.045;
    smoothPos.current.lerp(desired, still ? 1 : k);
    smoothTarget.current.lerp(desiredTarget, still ? 1 : k);
    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothTarget.current);
  });

  return null;
};

export default CameraController;
