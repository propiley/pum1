const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const prizeMessage = document.getElementById('prize-message');
const recordScoreButton = document.getElementById('record-score');
const playAgainButton = document.getElementById('play-again');
let score = 0;
let clickedPumpkins = 0;
let intervalTime = 10000;

const eyesImages = [
    'eyes1.png',
    'eyes2.png',
    'eyes3.png'
];

const bodyImages = [
    'body1.png',
    'body2.png',
    'body3.png'
];

const explosionImage = 'explosion.png';

function generateBoard() {
    gameBoard.innerHTML = '';
    clickedPumpkins = 0;
    progressBar.style.width = '0';
    prizeMessage.style.display = 'none';
    const uniquePumpkinIndex = Math.floor(Math.random() * 25);
    for (let i = 0; i < 25; i++) {
        const pumpkin = document.createElement('div');
        pumpkin.classList.add('pumpkin');
        
        const randomEyes = eyesImages[Math.floor(Math.random() * eyesImages.length)];
        const randomBody = bodyImages[Math.floor(Math.random() * bodyImages.length)];
        
        const pumpkinBody = document.createElement('div');
        pumpkinBody.classList.add('pumpkin-body');
        pumpkinBody.style.backgroundImage = `url('${randomBody}')`;
        
        const pumpkinEyes = document.createElement('div');
        pumpkinEyes.classList.add('pumpkin-eyes');
        pumpkinEyes.style.backgroundImage = `url('${randomEyes}')`;
        
        pumpkin.appendChild(pumpkinBody);
        pumpkin.appendChild(pumpkinEyes);
        
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
                pumpkinEyes.style.backgroundImage = 'none';
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

let gameInterval = setInterval(generateBoard, intervalTime);

recordScoreButton.addEventListener('click', () => {
    const nickname = prompt('Enter your nickname:');
    const walletAddress = prompt('Enter your TON wallet address:');
    // Code to record score in Google Sheets
    alert(`Score recorded for ${nickname} with wallet address ${walletAddress}`);
});

playAgainButton.addEventListener('click', () => {
    intervalTime -= 1000;
    gameInterval = setInterval(generateBoard, intervalTime);
    generateBoard();
});

generateBoard();
