// Arrival twinkles: a shower of tiny star sparkles that pops above the
// island you land on, then dissolves. No rings, just stars.

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIslands } from '../state/useIslands';
import { islandById } from '../data/navigation';

interface Pop {
  pos: [number, number, number];
  color: string;
  key: string;
}

const COUNT = 12;

const SparkleShower = ({ pop, onDone }: { pop: Pop; onDone: () => void }) => {
  const group = useRef<THREE.Group>(null);
  const life = useRef(0);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    life.current += dt;
    const t = life.current;
    const g = group.current;
    if (g) {
      const kids = g.children;
      for (let i = 0; i < kids.length; i++) {
        const k = Math.min(t / 1.5, 1);
        const a = (i / COUNT) * Math.PI * 2 + i * 0.7;
        const r = 0.5 + k * 4.5;
        kids[i].position.set(
          pop.pos[0] + Math.cos(a) * r,
          pop.pos[1] + k * 5.5,
          pop.pos[2] + Math.sin(a) * r,
        );
        const tw = Math.sin(k * Math.PI * 5 + i) * 0.5 + 0.5;
        const s = (1 - k * 0.5) * (0.5 + tw * 0.5);
        kids[i].scale.set(s, s, s);
        kids[i].rotation.y = t * 2 + i;
        const m = (kids[i] as THREE.Mesh).material as THREE.MeshBasicMaterial;
        m.opacity = 1 - k;
      }
    }
    if (t >= 1.6) onDone();
  });

  return (
    <group ref={group}>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh key={i} position={pop.pos}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? '#ffffff' : pop.color}
            transparent
            opacity={1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

const ArrivalSparkles = ({ still = false }: { still?: boolean }) => {
  const { current } = useIslands();
  const [pop, setPop] = useState<Pop | null>(null);
  const [prev, setPrev] = useState(current);

  // Fresh twinkles on every island change (render-phase adjustment).
  if (current !== prev) {
    setPrev(current);
    if (current !== 'overview' && !still) {
      const isl = islandById(current);
      setPop({
        pos: [isl.position[0], isl.position[1] + 2.2, isl.position[2]],
        color: isl.accent,
        key: `${current}`,
      });
    }
  }

  if (!pop) return null;
  return <SparkleShower key={pop.key} pop={pop} onDone={() => setPop(null)} />;
};

export default ArrivalSparkles;
