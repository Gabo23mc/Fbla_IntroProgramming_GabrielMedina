import React from 'react';
import { useGLTF } from '@react-three/drei';

// This component renders all main park models for the background
export default function ParkScene() {
  const castle = useGLTF('/assets/models/park/fantastic_castle.glb');
  const ferris = useGLTF('/assets/models/park/ferris_wheel.glb');
  const haunted = useGLTF('/assets/models/park/haunted_house.glb');
  const tree = useGLTF('/assets/models/park/stylized_tree.glb');
  // Add more models as needed

  return (
    <>
      <primitive object={castle.scene} position={[0, 0, -20]} scale={3} />
      <primitive object={ferris.scene} position={[10, 0, -15]} scale={2} />
      <primitive object={haunted.scene} position={[-12, 0, -18]} scale={2.5} />
      <primitive object={tree.scene} position={[-6, 0, -10]} scale={2} />
    </>
  );
}
