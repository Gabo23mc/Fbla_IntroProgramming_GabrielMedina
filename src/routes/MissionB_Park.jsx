import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkLoaderWrapper from '../components/ParkLoaderWrapper';
import ParkShowcaseWrapper from '../components/ParkShowcaseWrapper';
import HauntedHouseModel from '../components/HauntedHouseModel';
import ParkNavbar from '../components/ParkNavbar';
import ParkMusic from '../components/ParkMusic';
import '../styles/MissionBPark.css';

const MissionB_Park = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <ParkLoaderWrapper message="Loading haunted house...">
      <ParkShowcaseWrapper
        ModelComponent={HauntedHouseModel}
        cameraPosition={[0, 3, 10]}
        cameraLookAt={[0, 2, 0]}
        cameraFov={45}
      >
        <ParkMusic />
        <ParkNavbar />
        <h1 className="park-title animate-fadein">Haunted House of Mirrors</h1>

        {/* --- Step 0: Initial Decision --- */}
        {step === 0 && (
          <>
            <p className="park-desc animate-slideup">
              The mirrors distort your reflection and you hear whispers. What will you do?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(1)}>
                Enter the house
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(2)}>
                Inspect the entrance
              </button>
            </div>
          </>
        )}

        {/* --- Step 1: Consequence of Entering --- */}
        {step === 1 && (
          <>
            <p className="park-desc animate-slideup">
              You step inside. The air grows cold and the whispers intensify. Do you follow a reflection or try to find the exit?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(3)}> {/* Leads to new decision */}
                Follow a reflection (Seek guidance)
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(4)}> {/* Leads to new decision */}
                Try to find the exit (Escape the maze)
              </button>
            </div>
          </>
        )}

        {/* --- Step 2: Consequence of Inspecting --- */}
        {step === 2 && (
          <>
            <p className="park-desc animate-slideup">
              Inspecting the entrance reveals a hidden inscription. Do you try to decipher it or ignore it?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(5)}> {/* Leads to new decision */}
                Decipher the inscription (Uncover a secret)
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(6)}> {/* Leads to new decision */}
                Ignore the inscription (Move on)
              </button>
            </div>
          </>
        )}

        {/* --- Step 3: Consequence of Following Reflection (from Step 1) --- */}
        {step === 3 && (
          <>
            <p className="park-desc animate-slideup">
              The reflection leads you deeper into the maze! Do you trust it or try a different path?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/mission-b/action')}>
                Trust the reflection (Follow the guide)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                Try a different path (Risk getting lost)
              </button>
            </div>
          </>
        )}

        {/* --- Step 4: Consequence of Trying to Find Exit (from Step 1) --- */}
        {step === 4 && (
          <>
            <p className="park-desc animate-slideup">
              Trying to find the exit, you encounter a ghostly guardian! Do you confront it or try to sneak past?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                Confront it (Engage in battle)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}>
                Try to sneak past (Attempt stealth)
              </button>
            </div>
          </>
        )}

        {/* --- Step 5: Consequence of Deciphering Inscription (from Step 2) --- */}
        {step === 5 && (
          <>
            <p className="park-desc animate-slideup">
              The inscription reveals a secret about the mirrors! Do you use the knowledge or keep it to yourself?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}>
                Use the knowledge (Find the true path)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                Keep it to yourself (Miss an opportunity)
              </button>
            </div>
          </>
        )}

        {/* --- Step 6: Consequence of Ignoring Inscription (from Step 2) --- */}
        {step === 6 && (
          <>
            <p className="park-desc animate-slideup">
              Ignoring the inscription, you move deeper into the park. Do you head towards the roller coaster or the ferris wheel?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/mission-a')}>
                Roller Coaster (Seek thrills)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                Ferris Wheel (Seek safety)
              </button>
            </div>
          </>
        )}

      </ParkShowcaseWrapper>
    </ParkLoaderWrapper>
  );
};

export default MissionB_Park;
