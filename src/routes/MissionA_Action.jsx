import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpaceBackgroundWrapper from '../components/SpaceBackgroundWrapper';
import Navbar from '../components/Navbar'; // Importa el Navbar
import '../styles/MissionAAction.css';

const MissionA_Action = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const choice = location.state?.choice || 'flagship'; // Default to 'flagship' if state is missing

  console.log("Current step:", step);
  console.log("Received choice:", choice); // <-- CHECK THIS IN YOUR BROWSER CONSOLE

  return (
    <SpaceBackgroundWrapper>
      <Navbar /> {/* Agrega el Navbar aquí */}
      <h1 className="missiona-action-title animate-fadein">Mission A - Action/Consequence</h1>

      {/* --- Step 0: Initial Decision Outcome --- */}
      {step === 0 && (
        choice === 'flagship' ? (
          // Content for the 'flagship' choice outcome at step 0
          <>
            <p className="missiona-action-desc animate-slideup">
              You target the enemy flagship. Their shields are strong. Do you want to focus all firepower or try a stealth approach?
            </p>
            <div className="choices">
              <button className="mission-button animate-pop" onClick={() => setStep(1)}>
                Focus all firepower
              </button>
              <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
                Try a stealth approach (Risky!)
              </button>
            </div>
          </>
        ) : choice === 'engines' ? (
          // Content for the 'engines' choice outcome at step 0
          <>
            <p className="missiona-action-desc animate-slideup">
              You attempt to disable their engines. The enemy is preparing a counterattack. Do you want to hold your position or retreat?
            </p>
            <div className="choices">
              <button className="mission-button animate-pop" onClick={() => setStep(2)}>
                Hold your position (Stand your ground)
              </button>
              <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
                Retreat (Cut your losses)
              </button>
            </div>
          </>
        ) : choice === 'evasive' ? (
          // Content for the 'evasive' choice outcome at step 0
          <>
            <p className="missiona-action-desc animate-slideup">
              You try evasive maneuvers. The enemy is still on your tail. Do you want to hide in a nearby nebula or send a fake distress signal?
            </p>
            <div className="choices">
              <button className="mission-button animate-pop" onClick={() => setStep(3)}>
                Hide in the nebula (Seek cover)
              </button>
              <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
                Send a fake distress signal (Attempt deception)
              </button>
            </div>
          </>
        ) : (
          // Fallback for unexpected choice - leads to a bad ending or default path
          <>
            <p className="missiona-action-desc animate-slideup">
              An unexpected event occurred. The mission is compromised.
            </p>
            <div className="choices">
               <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
                Proceed with caution (Uncertain outcome)
              </button>
               <button className="mission-button animate-pop" onClick={() => navigate('/')}>
                Abort Mission (Return to Home)
              </button>
            </div>
          </>
        )
      )}

      {/* --- Step 1: Consequence of 'Focus all firepower' --- */}
      {step === 1 && (
        <>
          <p className="missiona-action-desc animate-slideup">
            Your concentrated attack breaks through! The flagship is destroyed. Do you want to rescue survivors or leave immediately?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => setStep(4)}> {/* Leads to new decision */}
              Rescue survivors (Show mercy)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Leave immediately (Prioritize safety)
            </button>
          </div>
        </>
      )}

      {/* --- Step 2: Consequence of 'Hold your position' --- */}
      {step === 2 && (
        <>
          <p className="missiona-action-desc animate-slideup">
            You hold your position and manage to disable the engines! The enemy surrenders. Do you want to accept their surrender or destroy their ship?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => setStep(5)}> {/* Leads to new decision */}
              Accept surrender (Seek alliance)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Destroy their ship (Eliminate threat)
            </button>
          </div>
        </>
      )}

      {/* --- Step 3: Consequence of 'Hide in the nebula' --- */}
      {step === 3 && (
        <>
          <p className="missiona-action-desc animate-slideup">
            You hide in the nebula and lose the enemy. Do you want to plot a new course or return to base?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => setStep(6)}> {/* Leads to new decision */}
              Plot a new course (Explore the unknown)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Return to base (Mission accomplished)
            </button>
          </div>
        </>
      )}

      {/* --- Step 4: Consequence of 'Rescue survivors' (from Step 1) --- */}\
      {step === 4 && (
        <>
          <p className="missiona-action-desc animate-slideup">
            You rescue survivors from the flagship. They reveal a hidden weakness in the enemy fleet. How do you use this information?\
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-good')}>
              Exploit the weakness (Plan a final strike)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Share the information with High Command (Follow protocol)
            </button>
          </div>
        </>
      )}

      {/* --- Step 5: Consequence of 'Accept surrender' (from Step 2) --- */}
      {step === 5 && (
        <>
          <p className="missiona-action-desc animate-slideup">
            You accept their surrender. The enemy captain offers a valuable artifact in exchange for safe passage. Do you accept?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-good')}>
              Accept the artifact (Gain a prize)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Refuse the artifact (Maintain integrity)
            </button>
          </div>
        </>
      )}

      {/* --- Step 6: Consequence of 'Plot a new course' (from Step 3) --- */}
      {step === 6 && (
        <>
          <p className="missiona-action-desc animate-slideup">
            Your new course leads you to a peaceful alien civilization. They offer trade and knowledge. Do you establish contact?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-good')}>
              Establish contact (Forge an alliance)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Observe from a distance (Avoid interference)
            </button>
          </div>
        </>
      )}

    </SpaceBackgroundWrapper>
  );
};

export default MissionA_Action;
