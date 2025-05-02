import React from 'react';
import ParkLoaderWrapper from '../components/ParkLoaderWrapper';
import ParkShowcaseWrapper from '../components/ParkShowcaseWrapper';
import FerrisWheelModel from '../components/FerrisWheelModel';
import ParkNavbar from '../components/ParkNavbar';
import ParkMusic from '../components/ParkMusic';
import { useNavigate } from 'react-router-dom';
import '../styles/EndingGoodPark.css';

const EndingGood_Park = () => {
  const navigate = useNavigate();

  return (
    <ParkLoaderWrapper message="Loading ferris wheel...">
      <ParkShowcaseWrapper
        ModelComponent={FerrisWheelModel}
        cameraPosition={[0, 144, 528]}
        cameraLookAt={[0, 72, 0]}
        cameraFov={40}
      >
        <ParkMusic />
        <ParkNavbar />
        <h1 className="park-title animate-fadein">You Escaped the Impossible Park!</h1>
        <p className="park-desc animate-slideup">
          Congratulations! You solved the mysteries and found your way out. The park will always remember your courage.
        </p>
        <div className="choices">
          <button className="park-button animate-pop" onClick={() => navigate('/park')}>
            Play Again
          </button>
          <button className="park-button animate-pop" onClick={() => window.location.href = '/'}>
            Return to Home
          </button>
        </div>
      </ParkShowcaseWrapper>
    </ParkLoaderWrapper>
  );
};

export default EndingGood_Park;
