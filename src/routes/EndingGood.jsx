import React from 'react';
import SpaceBackgroundWrapper from '../components/SpaceBackgroundWrapper';
import Navbar from '../components/Navbar'; // Importa el Navbar
import '../styles/FinalA.css';

const EndingGood = () => (
  <SpaceBackgroundWrapper>
    <Navbar /> {/* Agrega el Navbar aquí */}
    <h1 className="finala-title animate-fadein">Epic Victory!</h1>
    <p className="finala-desc animate-slideup">
      Congratulations! You completed your mission and returned home safely. The galaxy will remember your courage.
    </p>
    <div className="choices">
      <button className="mission-button animate-pop" onClick={() => window.location.href = '/'}>
        Return to Home
      </button>
      <button className="mission-button animate-pop" onClick={() => window.location.href = '/mission-a'}>
        Play Again
      </button>
    </div>
  </SpaceBackgroundWrapper>
);

export default EndingGood;
