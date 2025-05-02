import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, TransformControls, Html } from '@react-three/drei';
import { useThree, useLoader } from '@react-three/fiber';
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
        opacity={0.5}
        depthWrite={false}
      />
    </sprite>
  );
}

export default function HauntedHouseModel() {
  const gltf = useGLTF('/assets/models/park/haunted_house.glb');
  const ref = useRef();
  const { gl } = useThree();
  const [mode, setMode] = useState('translate'); // translate | rotate | scale

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

  return (
    <group>
      {/* Controles para cambiar el modo */}
      <Html position={[0, 10, 0]} center>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setMode('translate')}>Move</button>
          <button onClick={() => setMode('rotate')}>Rotate</button>
          <button onClick={() => setMode('scale')}>Scale</button>
        </div>
      </Html>
      {/* TransformControls para interacción */}
      <TransformControls object={ref} mode={mode}>
        <primitive
          ref={ref}
          object={gltf.scene}
          position={[0, 0, 0]}
          scale={6}
        />
      </TransformControls>
      {/* Luces y destello */}
      <pointLight position={[0, 10, 10]} intensity={1.2} color="#ffe082" />
      <pointLight position={[-10, 5, 10]} intensity={0.7} color="#ff4081" />
      <pointLight position={[10, 5, 10]} intensity={0.7} color="#1e90ff" />
      <FlareSprite />
    </group>
  );
}
