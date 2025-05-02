import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export default function RollerCoasterModel() {
  const gltf = useGLTF('/assets/models/park/roaller_coaster/source/RC.glb');
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    // Reproduce la animación
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
    // Mejora la calidad de las texturas
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          for (const key in mat) {
            if (mat[key] && mat[key].isTexture) {
              mat[key].minFilter = THREE.LinearFilter;
              mat[key].magFilter = THREE.LinearFilter;
              mat[key].anisotropy = 8; // O el máximo soportado por tu GPU
              mat[key].needsUpdate = true;
            }
          }
        });
      }
    });
  }, [actions, names, gltf.scene]);

  return <primitive object={gltf.scene} position={[0, -2, -10]} scale={2} />;
}
