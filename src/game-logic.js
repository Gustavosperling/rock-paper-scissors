document.addEventListener("DOMContentLoaded", function() {
  let playerChoice = "";
  let score = getStoredScore();
  let computerChoice = "";
  
  function updateGame() {
    // Generate computer's choice
    const choices = ["rock", "paper", "scissor"];
    computerChoice = choices[Math.floor(Math.random() * 3)];
  
    // Compare player's choice with computer's choice
    if (playerChoice === computerChoice) {
      // It's a tie
      setTimeout(() => {
        document.querySelector("#tie").style.visibility = "visible";
      }, 1000);
    } else if (
      (playerChoice === "rock" && computerChoice === "scissor") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissor" && computerChoice === "paper")
    ) {
      // Player wins
      setTimeout(() => {
        score++;
        document.querySelector("#score-value").textContent = score;
        updateScore(score);
        document.querySelector("#you-win").style.visibility = "visible";
        document.querySelector(".dot-player-winner").style.visibility = "visible";
      }, 1000);
    } else {
      // Computer wins
      setTimeout(() => {
        score--;
        document.querySelector("#score-value").textContent = score;
        updateScore(score);
        document.querySelector("#you-lose").style.visibility = "visible";
        document.querySelector(".dot-house-winner").style.visibility = "visible";
      }, 1000);
    }
  
    // Make play again button and house's choice visible
    document.querySelector(".dot").style.visibility = "visible";
    setTimeout(() => {
      document.querySelector("#house-" + computerChoice).style.visibility =
        "visible";
      document.querySelector(".play-again").style.visibility = "visible";
    }, 1000);
  }
  
  // Function to handle player choice click
  function handlePlayerChoice(choice) {
    playerChoice = choice;
    document.querySelector(`#${choice}`).classList.add(`${choice}-big`);
    document.querySelector(`#${choice}`).classList.remove(choice);
    
    // Disable player's choice button
    document.querySelector(`#${choice}`).disabled = true;
  
    // Hide other choices
    const otherChoices = ["paper", "rock", "scissor", "triangle"];
    otherChoices
      .filter((c) => c !== choice)
      .forEach((c) => {
        document.querySelector(`#${c}`).classList.add("hidden");
      });
  
    // Display "You Picked" and "House Picked"
    document.querySelector("#you-picked").style.display = "block";
    document.querySelector("#house-picked").style.display = "block";
  
    // Update the game logic
    updateGame();
  }
  
  function resetGame() {
    // Reset player's and house's choice
    document.querySelector(`#${playerChoice}`).classList.remove(`${playerChoice}-big`);
    document.querySelector(`#${playerChoice}`).classList.add(playerChoice);
    document.querySelector("#house-" + computerChoice).style.visibility = "hidden";
    document.querySelector(".dot").style.visibility = "hidden";
    // Reset other choices
    const choices = ["paper", "rock", "scissor", "triangle"];
    choices.forEach((el) => {
      document.querySelector(`#${el}`).classList.remove("hidden");
    });
  
    // Hide "You Picked" and "House Picked"
    document.querySelector("#you-picked").style.display = "none";
    document.querySelector("#house-picked").style.display = "none";
  
    // Hide play again button and result message
    document.querySelector(".play-again").style.visibility = "hidden";
    document.querySelector("#tie").style.visibility = "hidden";
    document.querySelector("#you-lose").style.visibility = "hidden";
    document.querySelector("#you-win").style.visibility = "hidden";
    document.querySelector(".dot-player-winner").style.visibility = "hidden";
    document.querySelector(".dot-house-winner").style.visibility = "hidden";
  
    // Enable the previously disabled button
    document.querySelector(`#${playerChoice}`).disabled = false;
  }
  
  // Function to update the score and store it in local storage
  function updateScore(score) {
    localStorage.setItem('score', score);
  }
  
  // Function to retrieve the score from local storage
  function getStoredScore() {
    const storedScore = localStorage.getItem('score');
    if (storedScore !== null) {
        document.querySelector("#score-value").textContent = storedScore;
        return parseInt(storedScore);
    }
    return 0;
  }
  
  // Event listeners for player choices and for play again button
  document.querySelector(".play-again").onclick = () => resetGame();
  document.querySelector("#paper").onclick = () => handlePlayerChoice("paper");
  document.querySelector("#rock").onclick = () => handlePlayerChoice("rock");
  document.querySelector("#scissor").onclick = () => handlePlayerChoice("scissor");

  const showImageButton = document.getElementById("rules");
    const myImage = document.getElementById("pop-up-image");
    showImageButton.addEventListener("click", () => {
      myImage.classList.toggle("visible");
    });

    document.querySelector("#pop-up-image span").onclick = () => {
      myImage.classList.toggle("visible");
    }
});

