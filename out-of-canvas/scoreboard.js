import { birdEnemies } from '../game.js';
import { gameOver, gameIsOver } from './screens.js';

const score = document.getElementById('score');
const time = document.getElementById('timer');
let counter = 0;

function startTimer() {
  let timer = null;
  counter = 0;
  timer = setInterval(() => {
    // Clear timer when game is over
    if (time.innerText === '05:00' || gameIsOver) {
      clearInterval(timer);
      gameOver();
    } else { 
      counter++;
      updateTime();
    }
  }, 1000);
}

// Update time in minutes and seconds
function updateTime() {
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;
  time.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// used in BirdEnemy.deleteEnemy() --> +1 Score
function updateScore() {
    score.innerText = birdEnemies.playerScore;
}

export { updateScore };
export { startTimer, counter };