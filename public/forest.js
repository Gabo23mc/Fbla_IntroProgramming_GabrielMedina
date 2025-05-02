document.addEventListener('DOMContentLoaded', () => {
    const steps = {
      takeLeftPath: `
        <p>You take the left path and hear the sound of water nearby. What will you do?</p>
        <div class="choices">
          <button id="followSound" class="btn btn-primary">Follow the sound</button>
          <button id="keepWalking" class="btn btn-success">Keep walking</button>
        </div>
      `,
      takeRightPath: `
        <p>You take the right path and notice a faint light in the distance. What will you do?</p>
        <div class="choices">
          <button id="approachLight" class="btn btn-primary">Approach the light</button>
          <button id="avoidLight" class="btn btn-success">Avoid it</button>
        </div>
      `,
      followSound: `
        <p>You find a small stream. Nearby, there’s a bridge. What will you do?</p>
        <div class="choices">
          <button id="crossBridge" class="btn btn-primary">Cross the bridge</button>
          <button id="followStream" class="btn btn-success">Follow the stream</button>
        </div>
      `,
      crossBridge: `
        <p>You cross the bridge and find a clearing with wild berries. What will you do?</p>
        <div class="choices">
          <button id="eatBerries" class="btn btn-danger">Eat the berries</button>
          <button id="leaveBerries" class="btn btn-primary">Leave the berries</button>
        </div>
      `,
      approachLight: `
        <p>You approach the light and find a small cabin. What will you do?</p>
        <div class="choices">
          <button id="knockDoor" class="btn btn-primary">Knock on the door</button>
          <button id="sneakAround" class="btn btn-danger">Sneak around</button>
        </div>
      `
    };
  
    const storyProgress = document.getElementById('storyProgress');
  
    // Initial Button Listeners
    document.getElementById('leftPath').addEventListener('click', () => {
      updateStory('takeLeftPath');
    });
  
    document.getElementById('rightPath').addEventListener('click', () => {
      updateStory('takeRightPath');
    });
  
    // Function to Update Story Content
    function updateStory(choice) {
      if (steps[choice]) {
        storyProgress.innerHTML = steps[choice] + addReturnButton(); // Add "Return to Beginning" button
        attachDynamicListeners();
      } else {
        storyProgress.innerHTML = `<p>An unknown path. Try again!</p>` + addReturnButton();
      }
    }
  
    // Attach Listeners for Dynamic Buttons
    function attachDynamicListeners() {
      const buttons = document.querySelectorAll('.choices button');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          const nextStep = e.target.id;
          handleNextStep(nextStep);
        });
      });
    }
  
    // Handle the Flow for Each Choice
    function handleNextStep(stepId) {
      switch (stepId) {
        case 'followSound':
          updateStory('followSound');
          break;
        case 'keepWalking':
          endStory('You kept walking and got lost deeper into the forest.', false);
          break;
        case 'approachLight':
          updateStory('approachLight');
          break;
        case 'avoidLight':
          endStory('You avoided the light and safely returned to the starting point.', true);
          break;
        case 'crossBridge':
          updateStory('crossBridge');
          break;
        case 'followStream':
          endStory('You followed the stream and found a small village.', true);
          break;
        case 'eatBerries':
          endStory('The berries were poisonous. You collapse.', false);
          break;
        case 'leaveBerries':
          endStory('You avoided the berries and found a safe path home.', true);
          break;
        case 'knockDoor':
          endStory('The cabin owner helps you find your way home.', true);
          break;
        case 'sneakAround':
          endStory('The cabin was a trap. You are captured.', false);
          break;
        default:
          storyProgress.innerHTML = `<p>An unknown path. Try again!</p>` + addReturnButton();
      }
    }
  
    // End Story and Show Final Message
    function endStory(message, isGoodEnding) {
      storyProgress.innerHTML = `
        <p>${message}</p>
        <div class="choices">
          <button onclick="location.reload()" class="btn btn-secondary">Return to Beginning <i class='fas fa-undo'></i></button>
        </div>
      `;
    }
  
    // Function to Add "Return to Beginning" Button
    function addReturnButton() {
      return `
        <div class="choices" style="margin-top: 10px;">
          <button onclick="location.reload()" class="btn btn-secondary">Return to Beginning <i class='fas fa-undo'></i></button>
        </div>
      `;
    }
  });
  