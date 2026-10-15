// Atmosphere for the archipelago: deep-space gradient, distant stars,
// procedural nebula sprites, drifting motes, and a restrained light rig.
// No shadow maps — depth comes from fog, emissive accents, and bloom.

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { mulberry32 } from './rng';

const Nebula = ({ count = 5 }: { count?: number }) => {
  const sprites = useMemo(() => {
    const rand = mulberry32(90210);
    const tex = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const ctx = c.getContext('2d');
      if (!ctx) return null;
      const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
      g.addColorStop(0, 'rgba(140,190,255,0.55)');
      g.addColorStop(0.5, 'rgba(120,140,255,0.18)');
      g.addColorStop(1, 'rgba(120,140,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      const t = new THREE.CanvasTexture(c);
      return t;
    })();
    return Array.from({ length: count }, (_, i) => ({
      tex,
      pos: [(rand() - 0.5) * 220, 10 + rand() * 60, -90 - rand() * 80] as [number, number, number],
      scale: 50 + rand() * 70,
      violet: i % 2 === 1,
    }));
  }, [count]);
  return (
    <group>
      {sprites.map((s, i) => (
        <sprite key={i} position={s.pos} scale={[s.scale, s.scale, 1]}>
          <spriteMaterial
            map={s.tex ?? undefined}
            color={s.violet ? '#8f9bff' : '#5fa8e8'}
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
};

const Motes = ({ count = 320 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const rand = mulberry32(4177);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 140;
      positions[i * 3 + 1] = -8 + rand() * 46;
      positions[i * 3 + 2] = -60 + rand() * 110;
      seeds[i] = rand() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  useFrame(({ clock }) => {
    const pts = ref.current;
    if (!pts) return;
    const t = clock.elapsedTime;
    const attr = pts.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      attr.setY(i, attr.getY(i) + Math.sin(t * 0.4 + seeds[i]) * 0.0012 + 0.0035);
      if (attr.getY(i) > 40) attr.setY(i, -8);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9fd8ff" size={0.22} transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const WorldEnvironment = ({ still = false }: { still?: boolean }) => (
  <>
    <color attach="background" args={['#050b14']} />
    <fog attach="fog" args={['#050b14', 55, 170]} />

    {/* Restrained cinematic rig: ambient + hemisphere + key + cyan/violet rims */}
    <ambientLight intensity={0.5} />
    <hemisphereLight args={['#bcd6ff', '#0b1524', 0.55]} />
    <directionalLight position={[28, 42, 18]} intensity={1.15} color="#eaf4ff" />
    <directionalLight position={[-30, 14, -20]} intensity={0.35} color="#7adeff" />
    <directionalLight position={[10, 8, -40]} intensity={0.3} color="#b9c2ff" />
    <pointLight position={[0, 6, 0]} intensity={120} distance={34} color="#7adeff" decay={2} />
    <pointLight position={[26, 7, -6]} intensity={80} distance={26} color="#7adeff" decay={2} />
    <pointLight position={[-26, 8, -8]} intensity={80} distance={26} color="#b9c2ff" decay={2} />
    <pointLight position={[-12, 11, -32]} intensity={110} distance={28} color="#c9ccff" decay={2} />

    <Stars radius={160} depth={60} count={2600} factor={5} saturation={0.4} fade speed={still ? 0 : 0.6} />
    <Nebula />
    <Motes />
  </>
);

export default WorldEnvironment;
