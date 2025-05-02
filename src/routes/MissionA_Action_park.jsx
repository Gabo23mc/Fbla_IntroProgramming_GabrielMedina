import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ParkLoaderWrapper from '../components/ParkLoaderWrapper';
import ParkBackgroundWrapper from '../components/ParkBackgroundWrapper';
import RollerCoasterModel from '../components/RollerCoasterModel';
import ParkNavbar from '../components/ParkNavbar';
import ParkMusic from '../components/ParkMusic';
import '../styles/MissionAActionPark.css';

const MissionA_Action_Park = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const initialChoice = location.state?.choice; // 'brace' or 'look'

  return (
    <ParkLoaderWrapper message="Loading roller coaster action...">
      <ParkBackgroundWrapper ModelComponent={RollerCoasterModel}>
        <ParkMusic />
        <ParkNavbar />
        <h1 className="park-title animate-fadein">Roller Coaster: Dimensional Ride</h1>

        {/* --- Step 0: Consequence of Initial Choice from MissionA_Park --- */}
        {step === 0 && (
          initialChoice === 'brace' ? (
            <>
              <p className="park-desc animate-slideup">
                You braced yourself for the drop! The G-force is intense. Do you scream or stay silent?
              </p>
              <div className="choices">
                <button className="park-button animate-pop" onClick={() => setStep(1)}> {/* Leads to new decision */}
                  Scream (Release tension)
                </button>
                <button className="park-button animate-pop" onClick={() => setStep(2)}> {/* Leads to new decision */}
                  Stay silent (Maintain focus)
                </button>
              </div>
            </>
          ) : initialChoice === 'look' ? (
            <>
              <p className="park-desc animate-slideup">
                You looked around, seeing impossible landscapes! Do you try to capture the view or focus on the ride?
              </p>
              <div className="choices">
                <button className="park-button animate-pop" onClick={() => setStep(3)}> {/* Leads to new decision */}
                  Capture the view (Record the impossible)
                </button>
                <button className="park-button animate-pop" onClick={() => setStep(4)}> {/* Leads to new decision */}
                  Focus on the ride (Stay safe)
                </button>
              </div>
            </>
          ) : (
            // Fallback for unexpected initial choice
            <>
              <p className="park-desc animate-slideup">
                An unexpected event occurred on the ride.
              </p>
              <div className="choices">
                <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}>
                  Brace for impact
                </button>
              </div>
            </>
          )
        )}

        {/* --- Step 1: Consequence of Screaming (from Step 0 - Brace) --- */}
        {step === 1 && (
          <>
            <p className="park-desc animate-slideup">
              Your scream echoes through dimensions! It seems to attract something... Do you prepare to fight or try to hide?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(5)}> {/* Leads to new decision */}
                Prepare to fight (Confront the unknown)
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(6)}> {/* Leads to new decision */}
                Try to hide (Seek cover)
              </button>
            </div>
          </>
        )}

        {/* --- Step 2: Consequence of Staying Silent (from Step 0 - Brace) --- */}
        {step === 2 && (
          <>
            <p className="park-desc animate-slideup">
              You stay silent, focusing your energy. You feel a strange connection to the track. Do you try to influence the ride or observe the energy?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(7)}> {/* Leads to new decision */}
                Influence the ride (Take control)
              </button>
              <button className="park-button animate-pop" onClick={() => setStep(8)}> {/* Leads to new decision */}
                Observe the energy (Seek understanding)
              </button>
            </div>
          </>
        )}

        {/* --- Step 3: Consequence of Capturing View (from Step 0 - Look) --- */}
        {step === 3 && (
          <>
            <p className="park-desc animate-slideup">
              You capture stunning images of impossible worlds! But the cart is unstable. Do you secure your device or keep filming?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(9)}> {/* Leads to new decision */}
                Secure your device (Protect your findings)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Keep filming (Risk everything for the shot)
              </button>
            </div>
          </>
        )}

        {/* --- Step 4: Consequence of Focusing on Ride (from Step 0 - Look) --- */}
        {step === 4 && (
          <>
            <p className="park-desc animate-slideup">
              You focus intently on the ride, anticipating every turn. You notice a pattern in the dimensional shifts. Do you try to predict the next shift or just hold on?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => setStep(10)}> {/* Leads to new decision */}
                Predict the next shift (Gain an advantage)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Just hold on (Prioritize safety)
              </button>
            </div>
          </>
        )}

        {/* --- Step 5: Consequence of Preparing to Fight (from Step 1) --- */}
        {step === 5 && (
          <>
            <p className="park-desc animate-slideup">
              You prepare to fight the entity attracted by your scream! It manifests as a swirling vortex. Do you attack it directly or try to evade?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Attack directly (Brute force)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}> {/* Leads to good ending */}
                Try to evade (Strategic retreat)
              </button>
            </div>
          </>
        )}

        {/* --- Step 6: Consequence of Trying to Hide (from Step 1) --- */}
        {step === 6 && (
          <>
            <p className="park-desc animate-slideup">
              You try to hide from the entity! You spot a small pocket dimension. Do you jump into it or stay on the track?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}> {/* Leads to good ending */}
                Jump into the pocket dimension (Find a new path)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Stay on the track (Face the entity)
              </button>
            </div>
          </>
        )}

        {/* --- Step 7: Consequence of Influencing Ride (from Step 2) --- */}
        {step === 7 && (
          <>
            <p className="park-desc animate-slideup">
              You influence the ride, subtly altering its path! You can steer towards a stable dimension or a chaotic one. Which do you choose?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}> {/* Leads to good ending */}
                Stable dimension (Safe passage)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Chaotic dimension (Risky shortcut)
              </button>
            </div>
          </>
        )}

        {/* --- Step 8: Consequence of Observing Energy (from Step 2) --- */}
        {step === 8 && (
          <>
            <p className="park-desc animate-slideup">
              You observe the energy, feeling its flow. You realize you can absorb it or redirect it. What do you do?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}> {/* Leads to good ending */}
                Absorb the energy (Gain power)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Redirect it (Cause chaos)
              </button>
            </div>
          </>
        )}

        {/* --- Step 9: Consequence of Securing Device (from Step 3) --- */}
        {step === 9 && (
          <>
            <p className="park-desc animate-slideup">
              You secured your device just as the cart jolts violently! You see a way to stabilize the cart using your device. Do you try it or just hold on?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}> {/* Leads to good ending */}
                Try to stabilize (Use your knowledge)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Just hold on (Hope for the best)
              </button>
            </div>
          </>
        )}

        {/* --- Step 10: Consequence of Predicting Shift (from Step 4) --- */}
        {step === 10 && (
          <>
            <p className="park-desc animate-slideup">
              You successfully predict the next dimensional shift! You can steer towards a known reality or an unknown one. Which do you choose?
            </p>
            <div className="choices">
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-good')}> {/* Leads to good ending */}
                Known reality (Safe return)
              </button>
              <button className="park-button animate-pop" onClick={() => navigate('/park/ending-bad')}> {/* Leads to bad ending */}
                Unknown reality (Risky exploration)
              </button>
            </div>
          </>
        )}

      </ParkBackgroundWrapper>
    </ParkLoaderWrapper>
  );
};

export default MissionA_Action_Park;
