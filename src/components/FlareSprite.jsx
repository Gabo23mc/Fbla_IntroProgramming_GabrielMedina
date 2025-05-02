import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending } from 'three';

export default function FlareSprite() {
  const texture = useLoader(TextureLoader, '/assets/vfx/flare/star.png');

  // Posiciones ultra lejanas en las esquinas
  const positions = [
    [180, 110, -150],   // ultra far top-right
    [180, -110, -170],  // ultra far bottom-right
    [-180, 110, -200],  // ultra far top-left
    [-180, -110, -220], // ultra far bottom-left
    [0, 130, -180],     // ultra far top-center
    [0, -130, -180],    // ultra far bottom-center
    [150, 0, -200],     // ultra far right-center
    [-150, 0, -200],    // ultra far left-center
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <sprite key={i} position={pos} scale={[10, 10, 1]}>
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
      ))}
    </>
  );
}
