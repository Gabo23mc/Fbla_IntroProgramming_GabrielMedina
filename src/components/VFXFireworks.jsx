import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending } from 'three';

export default function VFXFireworks() {
  const texture = new TextureLoader().load('/vfx/fireworks.png');
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = 10 + Math.sin(clock.getElapsedTime()) * 2;
      ref.current.material.opacity = 0.7 + 0.3 * Math.sin(clock.getElapsedTime() * 2);
    }
  });

  return (
    <sprite ref={ref} position={[0, 10, -30]} scale={[12, 12, 1]}>
      <spriteMaterial
        attach="material"
        map={texture}
        color={0xffffff}
        blending={AdditiveBlending}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </sprite>
  );
}

