let canvas;
let keyboard = new Keyboard();
let isGamePaused = false;

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}

function pauseGame(){
    document.getElementById('resumeOverlay').classList.remove('dNone');
    isGamePaused = true;
}

function resumeGame(){
    document.getElementById('resumeOverlay').classList.add('dNone');
    isGamePaused = false;
    requestAnimationFrame(() => world.draw());
}

function resetGame(){
    const gameOver = document.getElementById('gameOver');
    gameOver.classList.add('dNone');
    
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




