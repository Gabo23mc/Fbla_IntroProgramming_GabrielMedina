import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending } from 'three';

const GHOST_COUNT = 5;

function AnimatedGhost({ index }) {
  const ref = useRef();
  const texture = useLoader(TextureLoader, '/assets/vfx/ghost.png');

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + index * 10;
    if (ref.current) {
      ref.current.position.x = Math.sin(t * 0.5 + index) * (8 + index * 2);
      ref.current.position.y = 3 + Math.sin(t * 0.8 + index) * 2;
      ref.current.position.z = -18 + Math.cos(t * 0.3 + index) * 6;
      ref.current.material.opacity = 0.5 + 0.3 * Math.sin(t * 1.2 + index);
    }
  });

  return (
    <sprite ref={ref} scale={[3, 3, 1]} position={[0, 3, -18]}>
      <spriteMaterial
        attach="material"
        map={texture}
        color={0xffffff}
        blending={AdditiveBlending}
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </sprite>
  );
}

export default function VFXGhosts() {
  return (
    <>
      {Array.from({ length: GHOST_COUNT }).map((_, i) => (
        <AnimatedGhost key={i} index={i} />
      ))}
    </>
  );
}
