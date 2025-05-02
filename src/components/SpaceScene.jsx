import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import PlanetsBackground from './PlanetsBackground';
import AsteroidField from './AsteroidField';
import FloatingAstronaut from './FloatingAstronaut';
import FlareSprite from './FlareSprite';

function EquirectangularBackground() {
  const texture = useTexture('/assets/textures/space/8k_stars_milky_way.jpg');
  const { scene } = useThree();

  useEffect(() => {
    if (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
    }
    return () => {
      scene.background = null;
    };
  }, [texture, scene]);

  return null;
}

export default function SpaceScene() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <EquirectangularBackground />
        <PlanetsBackground />
        <AsteroidField />
        <FloatingAstronaut />
        <FlareSprite />
        {/* Aquí puedes agregar tu nave principal y acción central si lo deseas */}
      </Suspense>
    </Canvas>
  );
}
