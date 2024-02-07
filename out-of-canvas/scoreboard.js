import { birdEnemies } from '../game.js';

let counter = 0;
let timer = null;

function startTimer() {
  timer = setInterval(() => {
    counter++;
    updateTime();
  }, 1000);
}
startTimer();

function updateTime() {
  const time = document.getElementById('timer');
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;
  time.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (gameOver) {
    clearInterval(timer);
  }
}

// used in BirdEnemy.deleteEnemy() +1 Score
function updateScore() {
    const score = document.getElementById('score');
    score.innerText = birdEnemies.playerScore;
}

export { updateScore };
export { startTimer, updateTime };