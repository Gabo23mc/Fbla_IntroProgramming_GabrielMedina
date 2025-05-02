import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function PlanetsBackground() {
  const earthMap = useTexture('/assets/textures/space/8k_earth_daymap.jpg');
  const marsMap = useTexture('/assets/textures/space/8k_mars.jpg');
  const moonMap = useTexture('/assets/textures/space/8k_moon-2.jpg');

  const earthRef = useRef();
  const marsRef = useRef();
  const moonRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0007;
      // Ultra far top-left
      earthRef.current.position.x = -180 + Math.sin(t * 0.07) * 2;
      earthRef.current.position.y = 110 + Math.cos(t * 0.05) * 2;
    }
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.0009;
      // Ultra far bottom-right
      marsRef.current.position.x = 180 + Math.sin(t * 0.06) * 2;
      marsRef.current.position.y = -110 + Math.cos(t * 0.04) * 2;
    }
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.0012;
      // Ultra far top-right
      moonRef.current.position.x = 180 + Math.sin(t * 0.09) * 2;
      moonRef.current.position.y = 110 + Math.cos(t * 0.03) * 2;
    }
  });

  return (
    <>
      {/* Earth - ultra far top-left */}
      <mesh ref={earthRef} position={[-180, 110, -220]} scale={[24, 24, 24]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={earthMap} transparent opacity={0.7} />
      </mesh>
      {/* Mars - ultra far bottom-right */}
      <mesh ref={marsRef} position={[180, -110, -200]} scale={[18, 18, 18]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={marsMap} transparent opacity={0.6} />
      </mesh>
      {/* Moon - ultra far top-right */}
      <mesh ref={moonRef} position={[180, 110, -180]} scale={[14, 14, 14]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={moonMap} transparent opacity={0.5} />
      </mesh>
    </>
  );
}
