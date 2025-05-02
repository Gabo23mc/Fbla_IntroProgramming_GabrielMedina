import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceBackgroundWrapper from '../components/SpaceBackgroundWrapper';
import Navbar from '../components/Navbar';
import '../styles/MissionA.css';

const MissionA = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <SpaceBackgroundWrapper>
      <Navbar />
      <h1 className="missiona-title animate-fadein">Mission A: Enemy Zone</h1>
      {step === 0 && (
        <>
          <p className="missiona-desc animate-slideup">
            You approach the hostile sector. Enemy ships are detected on the radar. What is your strategy?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => setStep(1)}>
              Counterattack
            </button>
            <button className="mission-button animate-pop" onClick={() => setStep(2)}>
              Flee at maximum speed
            </button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p className="missiona-desc animate-slideup">
            You prepare your weapons. Do you want to target the enemy flagship or disable their engines?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-a/action', { state: { choice: 'flagship' } })}>
              Target the flagship
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-a/action', { state: { choice: 'engines' } })}>
              Disable their engines
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <p className="missiona-desc animate-slideup">
            You attempt to escape, but the enemy is closing in. Do you want to send a distress signal or try evasive maneuvers?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Send a distress signal
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-a/action', { state: { choice: 'evasive' } })}>
              Try evasive maneuvers
            </button>
          </div>
        </>
      )}
    </SpaceBackgroundWrapper>
  );
};

export default MissionA;
