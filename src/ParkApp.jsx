import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { useGLTF } from '@react-three/drei';

import IntroPark from './routes/IntroPark';
import MissionA_Park from './routes/MissionA_Park';
import MissionB_Park from './routes/MissionB_Park';
import MissionA_Action_Park from './routes/MissionA_Action_park';
import MissionB_Action_Park from './routes/MissionB_Action_Park';
import EndingGood_Park from './routes/EndingGood_Park';
import EndingBad_Park from './routes/EndingBad_Park';

import LoadingSpinner from './components/LoadingSpinner';
import './styles/ParkApp.css';

// Precarga de modelos para render rápido
useGLTF.preload('/assets/models/park/ferris_wheel.glb');
useGLTF.preload('/assets/models/park/roller_coaster.glb');
useGLTF.preload('/assets/models/park/haunted_house.glb');
useGLTF.preload('/assets/models/park/parkdoor.glb');

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ParkApp() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLoading && <LoadingSpinner message="Opening park gates..." />}
      <div className={`App park-app${isLoading ? ' loading' : ''}`}>
        <Routes>
          <Route path="/park" element={<IntroPark />} />
          <Route path="/park/mission-a" element={<MissionA_Park />} />
          <Route path="/park/mission-a/action" element={<MissionA_Action_Park />} />
          <Route path="/park/mission-b" element={<MissionB_Park />} />
          <Route path="/park/mission-b/action" element={<MissionB_Action_Park />} />
          <Route path="/park/ending-good" element={<EndingGood_Park />} />
          <Route path="/park/ending-bad" element={<EndingBad_Park />} />
          <Route path="*" element={<IntroPark />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default ParkApp;
