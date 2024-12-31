import React, { useEffect } from "react";
// import "./scripts.js";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

function App() {
  useEffect(() => {
    let playerName;
    let playerNameInput = document.getElementById("playerOne");
    let gameBoard = document.getElementById("rock-paper-scissor");
    let startGameBtn = document.getElementById("startGame");

    const choices = document.querySelectorAll(".choice");
    const score = document.getElementById("score");
    const result = document.getElementById("result");
    const restart = document.getElementById("restart");
    const modal = document.querySelector(".modal");

    const scoreboard = {
      player: 0,
      computer: 0,
    };

    const gameStartListener = () => {
      if (playerNameInput.value === "") {
        alert("Please enter player name");
        playerNameInput.focus();
        return;
      }
      playerName =
        playerNameInput.value.charAt(0).toUpperCase() +
        playerNameInput.value.slice(1);
      gameBoard.style.display = "flex";

      score.innerHTML = `
   <div class="row">
     <div class="col-12 d-flex align-items-center mb-4">
      <div class="col-6 text-start">${playerName}</div><div class="scoreBoardL p-2"> ${scoreboard.player}</div>
     </div>
     <div class="col-12 d-flex align-items-center">
      <div class="col-6 text-start">Computer </div><div class="scoreBoardL p-2"> ${scoreboard.computer}</div>
     </div>
   </div>
   `;
      playerNameInput.style.display = "none";
      startGameBtn.style.display = "none";
    };

    const gameStartButton = startGameBtn.addEventListener(
      "click",
      gameStartListener
    );

    function initGame() {
      gameBoard.style.display = "none";
    }

    initGame();

    function playGame(e) {
      restart.style.display = "inline-block";
      const playerChoice = e.target.id;
      console.log(playerChoice);
      const computerChoice = getComputerChoice();
      const winner = getWinner(playerChoice, computerChoice);
      showWinner(winner, computerChoice);
    }

    function getComputerChoice() {
      const randomNumber = Math.random();
      if (randomNumber < 0.34) {
        return "rock";
      } else if (randomNumber <= 0.67) {
        return "paper";
      } else {
        return "scissors";
      }
    }

    function getWinner(player, computer) {
      if (player === computer) {
        return "draw";
      } else if (player === "rock") {
        if (computer === "paper") {
          return "computer";
        } else {
          return "player";
        }
      } else if (player === "paper") {
        if (computer === "scissors") {
          return "computer";
        } else {
          return "player";
        }
      } else if (player === "scissors") {
        if (computer === "rock") {
          return "computer";
        } else {
          return "player";
        }
      }
    }

    function showWinner(winner, computerChoice) {
      console.log(computerChoice);
      if (winner === "player") {
        scoreboard.player++;
        result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <img id="rock" class="choice" src="./images/${computerChoice}.jpg" alt="rock"  width="150">
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;
      } else if (winner === "computer") {
        scoreboard.computer++;
        result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <img  class="choice" src="./images/${computerChoice}.jpg" alt="rock" width="150">
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;
      } else {
        result.innerHTML = `
      <h1>It's A Draw</h1>
      <img  class="choice" src="./images/${computerChoice}.jpg" alt="rock"  width="150">
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;
      }
      score.innerHTML = `
  <div class="row">
  <div class="col-12 d-flex align-items-center mb-4">
   <div class="col-6 text-start">${playerName}</div><div class="scoreBoardL p-2"> ${scoreboard.player}</div>
  </div>
  <div class="col-12 d-flex align-items-center">
   <div class="col-6 text-start">Computer </div><div class="scoreBoardL p-2"> ${scoreboard.computer}</div>
  </div>
</div>
    `;

      modal.style.display = "block";
    }

    function restartGame() {
      scoreboard.player = 0;
      scoreboard.computer = 0;
      gameBoard.style.display = "none";
      playerNameInput.style.display = "block";
      playerNameInput.value = "";
      startGameBtn.style.display = "block";
    }

    function clearModal(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    }

    choices.forEach((choice) => choice.addEventListener("click", playGame));
    window.addEventListener("click", clearModal);
    restart.addEventListener("click", restartGame);
  }, []);
  return (
    <div className="App">
      <main role="main" className="container pt-5">
        <div className="form-group">
          <div className="form-item">
            <input
              type="text"
              placeholder="player name"
              id="playerOne"
              autoComplete="off"
              className="form-control form-control-lg"
            />
          </div>
        </div>
        <div className="btn-container">
          <button className="btn btn-lg btn-secondary" id="startGame">
            Start Game
          </button>
        </div>
        <section id="rock-paper-scissor">
          <div className="container">
            <header className="header">
              <button className="btn btn-lg btn-secondary" id="restart">
                Restart Game
              </button>
            </header>
            <div className="game-container mt-5">
              <div className="item">
                <div className="form-item">
                  <div id="score" className="score" />
                </div>
              </div>
              <div className="item rock-paper-scissor">
                <h2 className="flex-grow-1">Select your choice</h2>
                <div className="flex align align-items-center">
                  <img
                    id="rock"
                    className="choice game-img"
                    src="./images/rock.jpg"
                    alt="rock"
                  />
                  <img
                    id="paper"
                    className="choice game-img"
                    src="./images/paper.jpg"
                    alt="rock"
                  />
                  <img
                    id="scissors"
                    className="choice game-img"
                    src="./images/scissors.jpg"
                    alt="rock"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
          <div className="modal">
            <div id="result" className="modal-content text-center" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
