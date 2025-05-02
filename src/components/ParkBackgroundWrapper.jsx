import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ParkBackgroundWrapper = ({ children, ModelComponent }) => (
  <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        background: 'url(/assets/textures/park/skycloud.jpg) center center / cover no-repeat',
        animation: 'skyFadeIn 2s cubic-bezier(.23,1.02,.64,1.01)'
      }}
    />
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <Canvas camera={{ position: [0, 2, 0], fov: 75 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[20, 30, 10]} intensity={2} castShadow />
        <Suspense fallback={null}>
          {ModelComponent && <ModelComponent />}
        </Suspense>
        {/* Opcional: controles para mirar alrededor */}
        <OrbitControls
          target={[0, 2, -10]}
          enablePan={false}
          minDistance={0.1}
          maxDistance={0.1}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
    <div className="center-ui-container">
      {children}
    </div>
  </div>
);

export default ParkBackgroundWrapper;
