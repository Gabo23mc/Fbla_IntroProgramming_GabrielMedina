import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

function CameraSetup({ position = [0, 4, 14], lookAt = [0, 2, 0], fov = 45 }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(...lookAt);
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [camera, position, lookAt, fov]);
  return null;
}

const ParkShowcaseWrapper = ({ children, ModelComponent, cameraPosition, cameraLookAt, cameraFov }) => (
  <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    {/* Sky background */}
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        background: 'url(/assets/models/park/coudy_sky.jpg) center center / cover no-repeat',
        animation: 'skyFadeIn 2s cubic-bezier(.23,1.02,.64,1.01)'
      }}
    />
    {/* 3D Canvas */}
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        background: 'url(/assets/models/park/cludy_sky.jpg) center center / cover no-repeat',
        animation: 'skyFadeIn 2s cubic-bezier(.23,1.02,.64,1.01)'      }}
    >
      <Canvas>
        <CameraSetup
          position={cameraPosition}
          lookAt={cameraLookAt}
          fov={cameraFov}
        />
        <ambientLight intensity={0.7} />
        <directionalLight position={[20, 30, 10]} intensity={2} castShadow />
        <Suspense fallback={null}>
          {ModelComponent && <ModelComponent />}
        </Suspense>
      </Canvas>
    </div>
    <div className="center-ui-container">
      {children}
    </div>
  </div>
);

export default ParkShowcaseWrapper;
