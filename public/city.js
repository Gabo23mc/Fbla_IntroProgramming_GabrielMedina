document.addEventListener('DOMContentLoaded', () => {
    const steps = {

        exploreDowntown: `
            <p>You explore downtown and find a bustling marketplace. What will you do next?</p>
            <div class="choices">
                <button id="visitCafe" class="btn btn-primary">Visit a café</button>
                <button id="exploreMarket" class="btn btn-success">Explore the marketplace</button>
            </div>
        `,
        visitCafe: `
            <p>You enjoy a warm coffee at the café. Suddenly, you notice a mysterious figure outside. What will you do?</p>
            <div class="choices">
                <button id="followFigure" class="btn btn-primary">Follow the figure</button>
                <button id="ignoreFigure" class="btn btn-success">Stay inside</button>
            </div>
        `,
        exploreMarket: `
            <p>You explore the market and find a rare artifact. What will you do?</p>
            <div class="choices">
                <button id="buyArtifact" class="btn btn-primary">Buy the artifact</button>
                <button id="ignoreArtifact" class="btn btn-success">Ignore it</button>
            </div>
        `,
        followFigure: `
            <p>You follow the figure and discover a hidden society of adventurers. Will you join them?</p>
            <div class="choices">
                <button id="joinSociety" class="btn btn-primary">Join them</button>
                <button id="declineSociety" class="btn btn-success">Decline and return</button>
            </div>
        `,
        buyArtifact: `
            <p>The artifact grants you mysterious powers. You feel an incredible energy coursing through you. What will you do?</p>
            <div class="choices">
                <button id="useArtifact" class="btn btn-primary">Use the artifact</button>
                <button id="hideArtifact" class="btn btn-success">Hide it for safety</button>
            </div>
        `
    };

    const storyProgress = document.getElementById('storyProgress');

    // Add event listeners for new choices
    // Initial Button Listeners
    document.getElementById('exploreDowntown').addEventListener('click', () => {
        updateStory('exploreDowntown');
    });

    document.getElementById('visitAlley').addEventListener('click', () => {
        endStory('You ventured into the alley and got lost in the city.', false);
    });

    // Function to Update Story Content
    function updateStory(choice) {
        if (steps[choice]) {
            storyProgress.innerHTML = steps[choice] + addReturnButton();
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


    // Handle the Flow for Each Choice|
            // Update the story text and choices

    function handleNextStep(stepId) {
        switch (stepId) {
            case 'visitCafe':
                updateStory('visitCafe');
                break;
            case 'exploreMarket':
                updateStory('exploreMarket');
                break;
            case 'followFigure':
                endStory('You joined the hidden society and became an adventurer. You found a new purpose in life!', true);
                break;
            case 'ignoreFigure':
                endStory('You stayed inside and missed an opportunity for adventure. You feel regret for not taking the chance.', false);
                break;
            case 'buyArtifact':
                endStory('The artifact gives you great power, but also great responsibility. You become a guardian of the city!', true);
                break;
            case 'ignoreArtifact':
                endStory('You walked away, leaving the artifact behind. The city remains unchanged, and you feel a sense of loss.', false);
                break;
            case 'joinSociety':
                endStory('You became a member of the hidden society of adventurers. You found a new purpose in life!', true);
                break;
            case 'declineSociety':
                endStory('You declined and returned to your normal life. You wonder what could have been.', false);
                break;
            case 'useArtifact':
                endStory('You used the artifact and changed the course of your life forever. You are now a hero of the city!', true);
                break;
            case 'hideArtifact':
                endStory('You hid the artifact, keeping its power a secret. The city remains unaware of the potential danger.', false);
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
