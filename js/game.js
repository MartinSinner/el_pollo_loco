let canvas;
let keyboard = new Keyboard();
let isGamePaused = false;
let isGameOver = false;


function init(){
    const startGame = document.getElementById('intro');
    startGame.classList.add('dNone');
    const startButtons = document.getElementById('buttonsMainMenu')
    startButtons.classList.add('dNone');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}

function pauseGame(){
    document.getElementById('resumeOverlay').classList.remove('dNone');
    isGamePaused = true;
}

function resumeGame(){
    isGamePaused = false;
    document.getElementById('resumeOverlay').classList.add('dNone');
   
    requestAnimationFrame(() => world.draw());
}

function resetGame(){
    isGamePaused = false;
    isGameOver = false;
    const gameOver = document.getElementById('gameOver');
    gameOver.classList.add('dNone');
    const youWin = document.getElementById('youWin');
    youWin.classList.add('dNone');
    
    
    if(world) {
        world.stopDrawing();
        clearAllIntervals();
        world = null;
    }
    

   
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chick(),
            new Endboss()
        ],
        generateClouds(),
        generateBackground(),
        [
            new Salsa(),
            new Salsa(),
            new Salsa(),
            new Salsa(),
            new Salsa(),
            new Salsa()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );

   
    world = new World(canvas, keyboard);
}

function clearAllIntervals(){
    gameIntervals.forEach(clearInterval);
    gameIntervals = [];
}




