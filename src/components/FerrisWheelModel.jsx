import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function FlareSprite() {
  const texture = useLoader(THREE.TextureLoader, '/assets/vfx/flare/star.png');
  return (
    <sprite position={[0, 8, 2]} scale={[8, 8, 1]}>
      <spriteMaterial
        attach="material"
        map={texture}
        color={0xffffff}
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </sprite>
  );
}

export default function FerrisWheelModel() {
  const gltf = useGLTF('/assets/models/park/ferris_wheel.glb');
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

  // Reproduce la animación si existe
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
  }, [actions, names]);

  // Si no hay animación, rota la rueda manualmente
  useFrame(() => {
    if (names.length === 0 && ref.current) {
      ref.current.rotation.z += 0.01;
    }
  });

  return (
    <group>
      <primitive
         ref={ref}
         object={gltf.scene}
         position={[0, 0, 0]}
         scale={20} // O prueba 10 si la ves muy lejos
      />
      {/* Ultra diseño: luces de acento */}
      <pointLight position={[0, 16, 16]} intensity={1.7} color="#ffe082" />
      <pointLight position={[-16, 10, 16]} intensity={1.2} color="#ff4081" />
      <pointLight position={[16, 10, 16]} intensity={1.2} color="#1e90ff" />
      {/* Destello central */}
      <FlareSprite />
    </group>
  );
}
