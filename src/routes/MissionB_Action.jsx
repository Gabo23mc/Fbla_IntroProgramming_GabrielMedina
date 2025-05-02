import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpaceBackgroundWrapper from '../components/SpaceBackgroundWrapper';
import Navbar from '../components/Navbar'; // Importa el Navbar
import '../styles/MissionBAction.css';

const MissionB_Action = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const choice = location.state?.choice || 'reboot'; // Default to 'reboot' if state is missing

  console.log("Current step:", step);
  console.log("Received choice:", choice); // <-- CHECK THIS IN YOUR BROWSER CONSOLE

  return (
    <SpaceBackgroundWrapper>
      <Navbar /> {/* Agrega el Navbar aquí */}
      <h1 className="missionb-action-title animate-fadein">Mission B - Action/Consequence</h1>

      {/* --- Step 0: Initial Decision Outcome --- */}
      {step === 0 && (
        choice === 'reboot' ? (
          // Content for the 'reboot' choice outcome at step 0
          <>
            <p className="missionb-action-desc animate-slideup">
              You attempt a full system reboot. The ship powers down. Do you want to wait for the reboot or try to manually restart the engines?
            </p>
            <div className="choices">
              <button className="mission-button animate-pop" onClick={() => setStep(1)}>
                Wait for reboot
              </button>
              <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
                Manually restart engines (Risky!)
              </button>
            </div>
          </>
        ) : choice === 'dock' ? (
          // Content for the 'dock' choice outcome at step 0
          <>
            <p className="missionb-action-desc animate-slideup">
              You dock at the outpost. The crew is tired. Do you want to rest or immediately request repairs?
            </p>
            <div className="choices">
              <button className="mission-button animate-pop" onClick={() => setStep(2)}>
                Rest (Regain strength)
              </button>
              <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
                Request repairs (Time is critical!)
              </button>
            </div>
          </>
        ) : (
          // Fallback for unexpected choice - leads to a bad ending or default path
          <>
            <p className="missionb-action-desc animate-slideup">
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

      {/* --- Step 1: Consequence of 'reboot' choice --- */}
      {step === 1 && (
        <>
          <p className="missionb-action-desc animate-slideup">
            The reboot is successful! Systems are back online. Do you want to continue your mission or return to base?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-good')}>
              Continue mission (Explore further)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Return to base (Safety first)
            </button>
          </div>
        </>
      )}

      {/* --- Step 2: Consequence of 'dock' choice --- */}
      {step === 2 && (
        <>
          <p className="missionb-action-desc animate-slideup">
            The crew is well rested and repairs are completed. Do you want to explore the outpost or set course for home?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => setStep(3)}>
              Explore the outpost (Potential rewards)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-good')}>
              Set course for home (Mission accomplished)
            </button>
          </div>
        </>
      )}

       {/* --- Step 3: Consequence of exploring the outpost --- */}
       {step === 3 && (
        <>
          <p className="missionb-action-desc animate-slideup">
            Exploring the outpost reveals ancient alien technology! Do you want to study it or leave it untouched?
          </p>
          <div className="choices">
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-good')}>
              Study the technology (Gain knowledge)
            </button>
            <button className="mission-button animate-pop" onClick={() => navigate('/ending-bad')}>
              Leave it untouched (Avoid risks)
            </button>
          </div>
        </>
      )}

    </SpaceBackgroundWrapper>
  );
};

export default MissionB_Action;
