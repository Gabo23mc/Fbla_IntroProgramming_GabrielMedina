import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkLoaderWrapper from '../components/ParkLoaderWrapper';
import ParkShowcaseWrapper from '../components/ParkShowcaseWrapper';
import HauntedHouseModel from '../components/HauntedHouseModel';
import ParkNavbar from '../components/ParkNavbar';
import ParkMusic from '../components/ParkMusic';
import '../styles/MissionBActionPark.css';

const MissionB_Action_Park = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <ParkLoaderWrapper message="Loading haunted house action...">
      <ParkShowcaseWrapper
        ModelComponent={HauntedHouseModel}
        cameraPosition={[0, 3, 10]}
        cameraLookAt={[0, 2, 0]}
        cameraFov={45}
      >
        <ParkMusic />
        <ParkNavbar />
        <h1 className="park-title animate-fadein">Haunted Mirrors: The Choice</h1>

        {/* --- Step 0: Initial Decision --- */}
        {step === 0 && (
          <>
            <p className="park-desc animate-slideup">
              The reflections twist and the ghosts whisper. Will you solve the riddle or confront the guardians?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(1)}>
                Solve the riddle
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(2)}>
                Confront the guardians
              </button>
            </div>
          </>
        )}

        {/* --- Step 1: Consequence of Solving Riddle --- */}
        {step === 1 && (
          <>
            <p className="park-desc animate-slideup">
              Solving the riddle reveals a hidden passage! Do you enter it or go back?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(3)}> {/* Leads to new decision */}
                Enter the hidden passage (Find the exit)
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(4)}> {/* Leads to new decision */}
                Go back (Get lost in the maze)
              </button>
            </div>
          </>
        )}

        {/* --- Step 2: Consequence of Confronting Guardians --- */}
        {step === 2 && (
          <>
            <p className="park-desc animate-slideup">
              Confronting the guardians is dangerous! Do you fight them or try to reason?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(5)}> {/* Leads to new decision */}
                Fight them (Risky battle)
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(6)}> {/* Leads to new decision */}
                Try to reason (Seek a peaceful solution)
              </button>
            </div>
          </>
        )}

        {/* --- Step 3: Consequence of Entering Hidden Passage (from Step 1) --- */}
        {step === 3 && (
          <>
            <p className="park-desc animate-slideup">
              The passage leads to a room filled with treasures! Do you take the treasure or look for the true exit?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}>
                Take the treasure (Gain riches)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                Look for the true exit (Prioritize escape)
              </button>
            </div>
          </>
        )}

        {/* --- Step 4: Consequence of Going Back (from Step 1) --- */}
        {step === 4 && (
          <>
            <p className="park-desc animate-slideup">
              Going back, you are surrounded by shifting mirrors! Do you trust your memory or follow a new reflection?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                Trust your memory (Risk getting lost)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}>
                Follow a new reflection (Find a way out)
              </button>
            </div>
          </>
        )}

        {/* --- Step 5: Consequence of Fighting Guardians (from Step 2) --- */}
        {step === 5 && (
          <>
            <p className="park-desc animate-slideup">
              You fight the guardians, a tough battle ensues! Do you use brute force or exploit their weaknesses?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                Use brute force (Risky approach)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}>
                Exploit weaknesses (Strategic victory)
              </button>
            </div>
          </>
        )}

        {/* --- Step 6: Consequence of Trying to Reason (from Step 2) --- */}
        {step === 6 && (
          <>
            <p className="park-desc animate-slideup">
              You try to reason with the guardians, offering a peaceful solution! Do they accept or attack?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}>
                They accept (Peaceful resolution)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                They attack (Forced to fight)
              </button>
            </div>
          </>
        )}

      </ParkShowcaseWrapper>
    </ParkLoaderWrapper>
  );
};

export default MissionB_Action_Park;
