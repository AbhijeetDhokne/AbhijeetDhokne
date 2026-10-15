// DEVSLAYER camera director — one centralized GSAP timeline per travel.
// New requests safely cancel the previous transition; Skip jumps to the end;
// reduced-motion snaps instantly. Poses come only from data/destinations.

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { destinationById, OVERVIEW_CAMERA } from '../data/destinations';
import { useGame } from '../state/useGame';
import { useReducedMotion } from '../hooks/device';

const TRAVEL_SECONDS = 2.4;

const CameraDirector = () => {
  const camera = useThree((s) => s.camera);
  const { travelRequest, skipNonce, markArrived, setTraveling } = useGame();
  const reduced = useReducedMotion();
  const tweens = useRef<gsap.core.Tween[]>([]);
  const look = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.target));
  const reducedRef = useRef(reduced);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    camera.position.set(...OVERVIEW_CAMERA.position);
    look.current.set(...OVERVIEW_CAMERA.target);
    camera.lookAt(look.current);
  }, [camera]);

  useEffect(() => {
    if (travelRequest.nonce === 0) return;
    const dest = travelRequest.dest;
    const pose = dest === 'overview' ? OVERVIEW_CAMERA : destinationById(dest)?.camera;
    if (!pose) return;

    setTraveling(true);
    tweens.current.forEach((t) => t.kill());
    tweens.current = [];

    if (reducedRef.current) {
      camera.position.set(...pose.position);
      look.current.set(...pose.target);
      camera.lookAt(look.current);
      markArrived(dest);
      return;
    }

    const pos = gsap.to(camera.position, {
      x: pose.position[0],
      y: pose.position[1],
      z: pose.position[2],
      duration: TRAVEL_SECONDS,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(look.current),
      onComplete: () => markArrived(dest),
    });
    const lk = gsap.to(look.current, {
      x: pose.target[0],
      y: pose.target[1],
      z: pose.target[2],
      duration: TRAVEL_SECONDS,
      ease: 'power2.inOut',
    });
    tweens.current = [pos, lk];
    return () => {
      tweens.current.forEach((t) => t.kill());
      tweens.current = [];
    };
  }, [travelRequest, camera, markArrived, setTraveling]);

  useEffect(() => {
    if (skipNonce === 0) return;
    // Jumping to the end fires onComplete → markArrived. No-op when idle.
    tweens.current.forEach((t) => t.progress(1));
  }, [skipNonce]);

  return null;
};

export default CameraDirector;
