import React from 'react';
import ParkLoaderWrapper from '../components/ParkLoaderWrapper';
import ParkShowcaseWrapper from '../components/ParkShowcaseWrapper';
import DoorModel from '../components/DoorModel';
import ParkNavbar from '../components/ParkNavbar';
import ParkMusic from '../components/ParkMusic';
import { useNavigate } from 'react-router-dom';
import '../styles/IntroPark.css';

const IntroPark = () => {
  const navigate = useNavigate();

  return (
    <ParkLoaderWrapper message="Opening park gates...">
      <ParkShowcaseWrapper
        ModelComponent={DoorModel}
        cameraPosition={[0, 2, 8]}
        cameraLookAt={[0, 2, 0]}
        cameraFov={60}
      >
        <ParkMusic />
        <ParkNavbar />
        <h1 className="park-title animate-fadein">Welcome to the Impossible Theme Park!</h1>
        <p className="park-desc animate-slideup">
          The golden door opens before you. Dare to enter?
        </p>
        <div className="choices">
          <button className="park-button animate-pop" onClick={() => navigate('/park/mission-a')}>
            Adventure A: Dimensional Roller Coaster
          </button>
          <button className="park-button animate-pop" onClick={() => navigate('/park/mission-b')}>
            Adventure B: Haunted House of Mirrors
          </button>
        </div>
      </ParkShowcaseWrapper>
    </ParkLoaderWrapper>
  );
};

export default IntroPark;
