let gameOn = false;
let level = 1;
let targetSequence = [];
let userSequence;

// Preload audio files
const audioFiles = {
    zero: new Audio("sounds/zero.mp3"),
    one: new Audio("sounds/one.mp3"),
    two: new Audio("sounds/two.mp3"),
    three: new Audio("sounds/tree.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
};

function initialize() {
    level = 1;
    targetSequence = [];
    userSequence = [];
    $("h1").text("Press any key to start");
    $("body").css("background-color", "#180161");
    $(document).keydown(function () {
        if (!gameOn) {
            startGame();
            gameOn = true;
        }
    });
}

function startGame() {
    userSequence = [];
    $("h1").text("Level " + level);
    targetSequence.push(Math.floor(Math.random() * 4));
    let targetButton;

    switch (targetSequence[targetSequence.length - 1]) {
        case 0:
            targetButton = "zero";
            break;
        case 1:
            targetButton = "one";
            break;
        case 2:
            targetButton = "two";
            break;
        case 3:
            targetButton = "three";
            break;
    }

    animatePress(targetButton);
    playSound(targetButton);
    $(".box").click(handleUserClick);
}

function animatePress(button) {
    $("#" + button).removeClass("notPressed").addClass("pressed");
    setTimeout(function () {
        $("#" + button).removeClass("pressed").addClass("notPressed");
    }, 100);
}

function playSound(button) {
    if (audioFiles[button]) {
        audioFiles[button].currentTime = 0; // Reset to start of audio
        audioFiles[button].play();
    }
}

function handleUserClick() {
    let userButton = $(this);
    let buttonId = userButton.attr("id");
    let buttonIndex;

    switch (buttonId) {
        case "zero":
            buttonIndex = 0;
            break;
        case "one":
            buttonIndex = 1;
            break;
        case "two":
            buttonIndex = 2;
            break;
        case "three":
            buttonIndex = 3;
            break;
    }
    
    userSequence.push(buttonIndex);
    animatePress(buttonId);
    playSound(buttonId);

    if (!compareSequences(userSequence, targetSequence)) {
        playSound("wrong");
        endGame();
    } else if (userSequence.length === targetSequence.length) {
        $(".box").off("click");
        setTimeout(nextLevel, 1000);
    }
}

function compareSequences(seq1, seq2) {
    for (let i = 0; i < seq1.length; i++) {
        if (seq1[i] !== seq2[i]) return false;
    }
    return true;
}

function nextLevel() {
    level++;
    startGame();
}

function endGame() {
    $("h1").html("Oops! It looks like level " + level + " was too much for you ;( </br>The game will restart in 10 second...").addClass("game-over");
    $("body").css("background-color", "#A91D3A");
    gameOn = false;
    $(".box").off("click");

    // Change the message to prompt a new start after a short delay
    setTimeout(function() {
        // $("h1").text("Restarting... Press any key to start a new game").removeClass("game-over");
        // $("body").css("background-color", "#180161");

        // Set up a new keydown listener by reinitializing the game
        initialize();
    }, 10000); // 5 seconds delay
}




$(document).ready(function () {
    initialize();
});
