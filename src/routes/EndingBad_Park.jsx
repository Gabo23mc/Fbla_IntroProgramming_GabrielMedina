import React from 'react';
import ParkLoaderWrapper from '../components/ParkLoaderWrapper';
import ParkShowcaseWrapper from '../components/ParkShowcaseWrapper';
import FerrisWheelModel from '../components/FerrisWheelModel';
import ParkNavbar from '../components/ParkNavbar';
import ParkMusic from '../components/ParkMusic';
import { useNavigate } from 'react-router-dom';
import '../styles/EndingBadPark.css';

const EndingBad_Park = () => {
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
        <h1 className="park-title animate-fadein">Lost in the Park Forever...</h1>
        <p className="park-desc animate-slideup">
          The park's secrets were too much this time. But don't worry, you can always try again!
        </p>
        <div className="choices">
          <button className="park-button animate-pop" onClick={() => navigate('/park')}>
            Try Again
          </button>
          <button className="park-button animate-pop" onClick={() => window.location.href = '/'}>
            Return to Home
          </button>
        </div>
      </ParkShowcaseWrapper>
    </ParkLoaderWrapper>
  );
};

export default EndingBad_Park;
