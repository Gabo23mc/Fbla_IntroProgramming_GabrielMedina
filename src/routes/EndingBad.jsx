import React from 'react';
import SpaceBackgroundWrapper from '../components/SpaceBackgroundWrapper';
import Navbar from '../components/Navbar'; // Importa el Navbar
import '../styles/FinalB.css';

const EndingBad = () => (
  <SpaceBackgroundWrapper>
    <Navbar /> {/* Agrega el Navbar aquí */}
    <h1 className="finalb-title animate-fadein">Tragic Ending</h1>
    <p className="finalb-desc animate-slideup">
      Unfortunately, your ship was lost in the depths of space. Try again for a better outcome!
    </p>
    <div className="choices">
      <button className="mission-button animate-pop" onClick={() => window.location.href = '/'}>
        Return to Home
      </button>
      <button className="mission-button animate-pop" onClick={() => window.location.href = '/mission-a'}>
        Try Again
      </button>
    </div>
  </SpaceBackgroundWrapper>
);

export default EndingBad;
