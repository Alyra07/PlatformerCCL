import { birdEnemies } from '../game.js';

const score = document.getElementById('score');
const time = document.getElementById('timer');
let counter = 0;

function startTimer() {
    let timer = null;
    timer = setInterval(() => {
        counter++;
        updateTime();
    }, 1000);
}
startTimer();

// Update time in minutes and seconds
function updateTime() {
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;
  time.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (gameOver) {
    clearInterval(timer);
  }
}

// used in BirdEnemy.deleteEnemy() --> +1 Score
function updateScore() {
    score.innerText = birdEnemies.playerScore;
}

export { updateScore };
export { startTimer, counter };