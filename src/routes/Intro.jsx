import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceBackgroundWrapper from '../components/SpaceBackgroundWrapper';
import Navbar from '../components/Navbar';
import '../styles/Intro.css';

const Intro = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 0: Primera decisión
  // Step 1: Segunda decisión según la primera opción elegida

  return (
    <SpaceBackgroundWrapper>
      <Navbar />
      <h1 className="intro-title animate-fadein">Welcome to the Space Adventure!</h1>
      {step === 0 && (
        <>
          <p className="intro-desc animate-slideup">
            You are the captain of the starship Odyssey. Your mission: explore the unknown and make choices that will shape your destiny.
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => setStep(1)}>
              Mission A: Enter the Enemy Zone
            </button>
            <button className="mission-button animate-pop" onClick={() => setStep(2)}>
              Mission B: Navigate the Asteroid Field
            </button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p className="intro-desc animate-slideup">
            As you approach the enemy zone, your sensors detect a strange energy signature. Do you want to investigate or proceed with caution?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-a')}>
              Investigate the energy signature
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-a')}>
              Proceed with caution
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <p className="intro-desc animate-slideup">
            The asteroid field is dense and dangerous. Do you want to plot a safe course or take a shortcut?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-b')}>
              Plot a safe course
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/mission-b')}>
              Take a risky shortcut
            </button>
          </div>
        </>
      )}
    </SpaceBackgroundWrapper>
  );
};

export default Intro;
