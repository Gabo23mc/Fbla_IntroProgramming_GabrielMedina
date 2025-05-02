import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkLoaderWrapper from '../components/ParkLoaderWrapper';
import ParkBackgroundWrapper from '../components/ParkBackgroundWrapper';
import RollerCoasterModel from '../components/RollerCoasterModel';
import ParkNavbar from '../components/ParkNavbar';
import ParkMusic from '../components/ParkMusic';
import '../styles/MissionAPark.css';

const MissionA_Park = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <ParkLoaderWrapper message="Loading roller coaster...">
      <ParkBackgroundWrapper ModelComponent={RollerCoasterModel}>
        <ParkMusic />
        <ParkNavbar />
        <h1 className="park-title animate-fadein">Dimensional Roller Coaster</h1>

        {/* --- Step 0: Initial Decision --- */}
        {step === 0 && (
          <>
            <p className="park-desc animate-slideup">
              The roller coaster twists through dimensions. Ready for the ride?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(1)}>
                Board the first car
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(2)}>
                Observe from the platform
              </button>
            </div>
          </>
        )}

        {/* --- Step 1: Consequence of Boarding --- */}
        {step === 1 && (
          <>
            <p className="park-desc animate-slideup">
              You are strapped in! The cart begins to move towards the first drop. Do you brace yourself or look around?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/mission-a/action', { state: { choice: 'brace' } })}> {/* Leads to action with 'brace' choice */}
                Brace yourself (Prepare for impact)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/mission-a/action', { state: { choice: 'look' } })}> {/* Leads to action with 'look' choice */}
                Look around (Enjoy the view)
              </button>
            </div>
          </>
        )}

        {/* --- Step 2: Consequence of Observing --- */}
        {step === 2 && (
          <>
            <p className="park-desc animate-slideup">
              Observing reveals strange energy fluctuations around the track. Do you warn the staff or try to understand them?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}> {/* Leads to good ending */}
                Warn the staff (Prevent disaster)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/mission-b')}> {/* Leads to Mission B */}
                Try to understand (Seek knowledge)
              </button>
            </div>
          </>
        )}

        {/* --- Paths from Step 1 now lead to MissionA_Action_Park --- */}
        {/* --- Paths from Step 2 lead to endings or Mission B --- */}

      </ParkBackgroundWrapper>
    </ParkLoaderWrapper>
  );
};

export default MissionA_Park;
