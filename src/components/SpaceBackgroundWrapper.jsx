import React, { Suspense } from 'react';
import SpaceScene from './SpaceScene';
import BackgroundMusic from './BackgroundMusic';

const SpaceBackgroundWrapper = ({ children }) => (
  <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    {/* 3D Space Background */}
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
    }}>
      <Suspense fallback={null}>
        <SpaceScene />
      </Suspense>
    </div>
    {/* Background music */}
    <BackgroundMusic />
    {/* Centered UI */}
    <div className="center-ui-container">
      {children}
    </div>
  </div>
);

export default SpaceBackgroundWrapper;
