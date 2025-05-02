// Main React application for the Space adventure

import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { useGLTF } from '@react-three/drei';

// Import space adventure routes
import Intro from './routes/Intro';
import MissionA from './routes/MissionA';
import MissionB from './routes/MissionB';
import MissionA_Action from './routes/MissionA_Action';
import MissionB_Action from './routes/MissionB_Action';
import EndingGood from './routes/EndingGood';
import EndingBad from './routes/EndingBad';

// import Navbar from './components/Navbar'; // Not needed here

import SpaceScene from './components/SpaceScene';
import LoadingSpinner from './components/LoadingSpinner';

// Import styles for the app and scenes
import './styles/AnimatedBackground.css';
import './styles/Button.css';
import './styles/ChoiceCard.css';
import './styles/Navbar.css';
import './styles/Intro.css';
import './styles/MissionA.css';
import './styles/MissionB.css';
import './styles/FinalA.css';
import './styles/FinalB.css';
import './styles/SceneTransition.css';
import './styles/App.css';
import './styles/LoadingSpinner.css';
import './space.css';

// Preload 3D space models
useGLTF.preload('/assets/models/space/asteroid_lowpoly.glb');
useGLTF.preload('/assets/models/space/Astronaut.glb');
useGLTF.preload('/assets/models/space/EnemyShip.glb');
useGLTF.preload('/assets/models/space/SpaceStation.glb');

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Main SpaceApp component
function SpaceApp() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLoading && <LoadingSpinner message="Launching space adventure..." />}
      <div className={`App space-app${isLoading ? ' loading' : ''}`}>
        {/* 3D background */}
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
        {/* Central UI */}
        <div className="center-ui-container">
          <div className="center-content">
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/mission-a" element={<MissionA />} />
              <Route path="/mission-a/action" element={<MissionA_Action />} />
              <Route path="/mission-b" element={<MissionB />} />
              <Route path="/mission-b/action" element={<MissionB_Action />} />
              <Route path="/ending-good" element={<EndingGood />} />
              <Route path="/ending-bad" element={<EndingBad />} />
              <Route path="*" element={<Intro />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default SpaceApp;
