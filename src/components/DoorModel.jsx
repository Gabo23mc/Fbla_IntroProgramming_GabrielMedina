import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function DoorModel() {
  const gltf = useGLTF('/assets/models/park/parkdoor.glb');
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);
  const ref = useRef();
  const { gl } = useThree();

  // Mejora la calidad de las texturas
  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          for (const key in mat) {
            if (mat[key] && mat[key].isTexture) {
              mat[key].minFilter = THREE.LinearFilter;
              mat[key].magFilter = THREE.LinearFilter;
              mat[key].anisotropy = maxAnisotropy;
              mat[key].needsUpdate = true;
            }
          }
        });
      }
    });
  }, [gltf.scene, gl]);

  // Reproduce la animación automáticamente si existe
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
  }, [actions, names]);

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={5}
    />
  );
}
