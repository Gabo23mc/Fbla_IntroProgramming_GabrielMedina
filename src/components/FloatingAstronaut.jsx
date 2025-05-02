import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function FloatingAstronaut() {
  const { scene } = useGLTF('/assets/models/space/Astronaut.glb');
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      // Flotación lenta arriba a la izquierda, sin cruzar la pantalla
      ref.current.position.x = -90 + Math.sin(t * 0.13) * 10;
      ref.current.position.y = 80 + Math.cos(t * 0.11) * 6;
      ref.current.position.z = -150 + Math.sin(t * 0.09) * 8;
      // Rotación lenta y caída
      ref.current.rotation.y = Math.sin(t * 0.15) * 0.7;
      ref.current.rotation.x = Math.cos(t * 0.11) * 0.3;
      ref.current.rotation.z = Math.sin(t * 0.09) * 0.2;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[14, 14, 14]} // Grande y visible
      position={[-90, 80, -150]}
    />
  );
}

