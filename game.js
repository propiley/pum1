const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const prizeMessage = document.getElementById('prize-message');
const recordScoreButton = document.getElementById('record-score');
const playAgainButton = document.getElementById('play-again');
const timerDisplay = document.getElementById('timer');
let score = 0;
let clickedPumpkins = 0;
let intervalTime = 10000;
let timeLeft = intervalTime / 1000;

const pumpkinImages = [
    'pumpkin1.gif',
    'pumpkin2.gif',
    'pumpkin3.gif'
];

const explosionImage = 'explosion.png';

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
        timeLeft = intervalTime / 1000;
        generateBoard(); // Пересоздаем игровое поле
    }
}

function generateBoard() {
    gameBoard.innerHTML = '';
    clickedPumpkins = 0;
    progressBar.style.width = '0';
    prizeMessage.style.display = 'none';
    const uniquePumpkinIndex = Math.floor(Math.random() * 25);
    for (let i = 0; i < 25; i++) {
        const pumpkin = document.createElement('div');
        pumpkin.classList.add('pumpkin');
        
        const randomPumpkin = pumpkinImages[Math.floor(Math.random() * pumpkinImages.length)];
        
        const pumpkinBody = document.createElement('div');
        pumpkinBody.classList.add('pumpkin-body');
        pumpkinBody.style.backgroundImage = `url('${randomPumpkin}')`;
        
        pumpkin.appendChild(pumpkinBody);
        
        if (i === uniquePumpkinIndex) {
            pumpkin.dataset.points = 10;
        } else {
            pumpkin.dataset.points = 1;
        }
        
        pumpkin.addEventListener('click', () => {
            if (!pumpkin.classList.contains('clicked')) {
                score += parseInt(pumpkin.dataset.points);
                scoreDisplay.textContent = `Score: ${score}`;
                pumpkin.classList.add('clicked');
                pumpkinBody.style.backgroundImage = `url('${explosionImage}')`;
                clickedPumpkins++;
                progressBar.style.width = `${(clickedPumpkins / 25) * 100}%`;
                if (clickedPumpkins === 25) {
                    prizeMessage.style.display = 'block';
                    clearInterval(gameInterval);
                }
            }
        });
        
        gameBoard.appendChild(pumpkin);
    }
}

let gameInterval = setInterval(() => {
    generateBoard();
    timeLeft = intervalTime / 1000;
}, intervalTime);

let timerInterval = setInterval(updateTimer, 1000);

recordScoreButton.addEventListener('click', () => {
    const nickname = prompt('Enter your nickname:');
    const walletAddress = prompt('Enter your TON wallet address:');
    // Code to record score in Google Sheets
    alert(`Score recorded for ${nickname} with wallet address ${walletAddress}`);
});

playAgainButton.addEventListener('click', () => {
    intervalTime -= 1000;
    gameInterval = setInterval(() => {
        generateBoard();
        timeLeft = intervalTime / 1000;
    }, intervalTime);
    generateBoard();
});

generateBoard();
