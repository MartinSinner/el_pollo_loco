let canvas;
let keyboard = new Keyboard();
let world;
let isGamePaused = false;
let isGameOver = false;


function init() {
    hideMainMenu();
    resetWorld();
    createLevel();
    world = new World(canvas, keyboard);
}

function hideMainMenu() {
    document.getElementById('intro').classList.add('dNone');
    document.getElementById('buttonsMainMenu').classList.add('dNone');
    canvas = document.getElementById('canvas');
}


function resetWorld() {
    if (world) {
        world.stopDrawing();
        clearAllIntervals();
        world = null;
    }
}


function createLevel() {
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
}


function mainMenu() {
    resetWorld();
    isGamePaused = false;
    isGameOver = false;
    showMainMenu();
}


function showMainMenu() {
    document.getElementById('intro').classList.remove('dNone');
    document.getElementById('buttonsMainMenu').classList.remove('dNone');
    hideGameOverOrWinScreen();
}


function hideGameOverOrWinScreen(){
    document.getElementById('gameOver').classList.add('dNone');
    document.getElementById('youWin').classList.add('dNone');
    document.getElementById('resumeOverlay').classList.add('dNone');
}


function pauseGame() {
    document.getElementById('resumeOverlay').classList.remove('dNone');
    isGamePaused = true;
}


function resumeGame() {
    document.getElementById('resumeOverlay').classList.add('dNone');
    isGamePaused = false;
    requestAnimationFrame(() => world.draw());
}


function resetGame() {
    isGamePaused = false;
    isGameOver = false;
    hideGameOverOrWinScreen();
    resetWorld();
    createLevel();
    world = new World(canvas, keyboard);
}


function clearAllIntervals() {
    gameIntervals.forEach(clearInterval);
    gameIntervals = [];
}

function howToPlay() {
    document.getElementById('howToPlayOverlay').classList.remove('dNone');
}

function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('dNone');
}

function openImpressum() {
    document.getElementById('impressumOverlay').classList.remove('dNone');
}

function closeImpressum() {
    document.getElementById('impressumOverlay').classList.add('dNone');
}




