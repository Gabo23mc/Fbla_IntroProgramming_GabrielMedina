import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceBackgroundWrapper from '../components/SpaceBackgroundWrapper';
import Navbar from '../components/Navbar'; // Importa el Navbar
import '../styles/MissionB.css';

const MissionB = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <SpaceBackgroundWrapper>
      <Navbar /> {/* Agrega el Navbar aquí */}
      <h1 className="missionb-title animate-fadein">Mission B: Asteroid Field</h1>
      {step === 0 && (
        <>
          <p className="missionb-desc animate-slideup">
            Your ship is damaged in the asteroid field. You must act quickly to survive. What will you do?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => setStep(1)}>
              Try to repair the ship
            </button>
            <button className="mission-button animate-pop" onClick={() => setStep(2)}>
              Search for a space station
            </button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p className="missionb-desc animate-slideup">
            The repairs are risky. Do you want to attempt a full system reboot or patch the hull manually?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-b/action', { state: { choice: 'reboot' } })}>
              Full system reboot
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Patch the hull manually
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <p className="missionb-desc animate-slideup">
            You scan for stations. Do you want to dock at the nearest outpost or send a distress signal?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-b/action', { state: { choice: 'dock' } })}>
              Dock at the outpost
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Send a distress signal
            </button>
          </div>
        </>
      )}
    </SpaceBackgroundWrapper>
  );
};

export default MissionB;
