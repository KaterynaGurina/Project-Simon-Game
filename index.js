let gameOn;
let level;
let targetSequence;
let userSequence;
let targetButton;

function initialize() {
    level = 1;
    targetSequence = [];
    userSequence = [];
    gameOn = false;
    
    $(document).keydown(function() {
        if (!gameOn) {
            gameOn = true;
            startGame();
        }
    });
}

function startGame() {
    userSequence = []; // Reset user sequence at the start of each level

    // Display the level and add the next button to the sequence
    $("h1").text("Level " + level);
    targetSequence.push(Math.floor(Math.random() * 4));

    // Determine which button corresponds to the last number in the sequence
    switch (targetSequence[targetSequence.length - 1]) {
        case 0:
            targetButton = $("#zero");
            break;
        case 1:
            targetButton = $("#one");
            break;
        case 2:
            targetButton = $("#two");
            break;
        case 3:
            targetButton = $("#three");
            break;
    }

    // Show this button to the player
    targetButton.removeClass("notPressed").addClass("pressed");
    setTimeout(function() {
        targetButton.removeClass("pressed").addClass("notPressed");
    }, 200);
    
    // Listen for user to press the buttons
    $(".box").click(handleUserClick);
}

function handleUserClick() {
    let userButton = $(this); // Store the reference to the clicked element

    // Determine which button was clicked and push it to userSequence
    switch (userButton.attr("id")) {
        case "zero":
            userSequence.push(0);
            break;
        case "one":
            userSequence.push(1);
            break;
        case "two":
            userSequence.push(2);
            break;
        case "three":
            userSequence.push(3);
            break;
    }

    // Light up the button when clicked
    userButton.removeClass("notPressed").addClass("pressed");
    setTimeout(function() {
        userButton.removeClass("pressed").addClass("notPressed");
    }, 100); // Adjust the delay time as needed

    // Compare the user's input with the target sequence so far
    if (!compareSequences(userSequence, targetSequence)) {
        endGame();
    } else if (userSequence.length === targetSequence.length) {
        // If the entire sequence was correct, proceed to the next level
        $(".box").off("click"); // Remove click listeners until the next level starts
        setTimeout(nextLevel, 1000); // Start the next level after a short delay
    }
}


function compareSequences(seq1, seq2) {
    for (let i = 0; i < seq1.length; i++) {
        if (seq1[i] !== seq2[i]) {
            return false;
        }
    }
    return true;
}

function nextLevel() {
    level++;
    startGame();
}

function endGame() {
    $("h1").text("Oops! It looks like level " + level + " was too much for you ;(")
           .addClass("game-over"); // Add the class here
    $("body").css("background-color", "#A91D3A");
    gameOn = false;
    $(".box").off("click"); // Remove click listeners to stop the game
}


// Initialize the game when the page loads
$(document).ready(function() {
    initialize();
});
