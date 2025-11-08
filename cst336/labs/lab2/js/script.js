//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess)
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";
  
   //adding focus to textbox
   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to textbox
   playerGuess.value = ""; //clearing textbox

   //clearing previous guesses / attempts
   document.querySelector("#guesses").textContent = "";
   document.querySelector("#attempts").textContent = 7;

   //attempting
   document.querySelector("#wins").textContent = wins;
   document.querySelector("#losses").textContent = losses;


}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if ((guess < 1 || guess > 99) || isNaN(Number(guess))) {
        let feedback = document.querySelector("#feedback");
        feedback.textContent = "I said, ENTER A NUMBER BETWEEN 1 and 99, DARK KNIGHT!";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "Somehow, you beat my riddle! The number was " + guess + "! I am foiled again! You Won, HERO!";
        feedback.style.color = "darkgreen";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attempts").textContent = 7 - attempts;
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hide Guess button
    resetBtn.style.display = "inline"; //display Reset button
}
