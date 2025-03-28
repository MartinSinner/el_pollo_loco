/**
 * The canvas where the game is drawn
 * @type {HTMLCanvasElement}
 */
let canvas;


/**
 * Object to track pressed keys
 * @type {Keyboard}
 */
let keyboard = new Keyboard();


/**
 * The main game world
 * @type {World}
 */
let world;


// --- Sounds & Music --- 
let intro_music = new Audio('audio/audio_intro.mp3');
intro_music.volume = 0.5;
let background_music = new Audio('audio/audio_backgroundmusic.mp3');
background_music.volume = 0.05;
let click_sound = new Audio('audio/click.mp3');

let chicken_sound = new Audio('audio/audio_chicken.mp3');
chicken_sound.volume = 0.5;
let chick_sound = new Audio('audio/audio_chick.mp3');
chick_sound.volume = 0.5;
let endboss_hurt_sound = new Audio('audio/audio_endbosshurt.mp3');
let endboss_death_sound = new Audio('audio/audio_endbossdead.wav');

let pepe_walking_sound = new Audio('audio/audio_running.mp3');
let pepe_jump_sound = new Audio('audio/audio_pepejump.mp3');
pepe_jump_sound.volume = 1;
let pepe_hurt_sound = new Audio('audio/audio_pepehurt.mp3');
pepe_hurt_sound.volume = 0.6;
let pepe_sleeping_sound = new Audio('audio/audio_pepesleeps.mp3');
pepe_sleeping_sound.volume = 0.05;

let bottle_throw_sound = new Audio('audio/audio_throw.mp3');
let bottle_splash_sound = new Audio('audio/audio_salsa-splash.mp3');
let collect_bottle_sound = new Audio('audio/audio_bottle.mp3');
let collect_coin_sound = new Audio('audio/audio_collect-coin.mp3');
collect_coin_sound.volume = 0.4;

let gameover_sound = new Audio('audio/audio_gameover.mp3');
let win_sound = new Audio('audio/audio_winning.mp3');


/**
 * Checks if the sound is muted
 * @type {boolean}
 */
let isMuted = localStorage.getItem('isMuted') === "true";


/**
 * Game is paused
 * @type {boolean}
 */
let isGamePaused = false;


/**
 * Game is over
 * @type {boolean}
 */
let isGameOver = false;


/**
 * Triggers all event listeners for game
 * 
 * includes:
 * - first screen click to show the main menu.
 * - playing a sound when any menu button is clicked.
 * - checking screen orientation on load, resize, or rotation.
 */


function initEventListeners() {
    handleFirstClick();
    setUpButtonsClickSonds();
    setUpOrientation();
}


/**
 * Sets up the first screen click to start the intro and show the main menu.
 */
function handleFirstClick() {
    const firstClickScreen = document.getElementById('firstClickScreen');
    firstClickScreen.addEventListener('click', () => {
        startIntroMusic();
        firstClickScreen.classList.add('dNone');
        document.getElementById('buttonsMainMenu').classList.remove('dNone');
        document.getElementById('intro').classList.remove('dNone');
    });
}


/**
 * Adds a sound effect when any menu button is clicked.
 */
function setUpButtonsClickSonds() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const sound = document.getElementById('buttonSound');
            sound.currentTime = 0;
            sound.play();
        });
    });
}


/**
 * Adds listeners to check screen orientation on resize, load or rotation for mobile view.
 */
function setUpOrientation(){
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('load', checkOrientation); 
}


//-- MUSIC CONTROLL ---

/** Start intro music */
function startIntroMusic() {
    if (!isMuted) {
        intro_music.play();
    }
}


/** Stop intro music */
function stopIntroMusic() {
    intro_music.pause();
}


/** Start background game music */
function startBackgroundMusic() {
    background_music.play();
}


/** Stop background game music */
function stopBackgroundMusic() {
    background_music.pause();
}

// --- GAME ---


/** Start the game */
function init() {
    hideMainMenu();
    resetWorld();
    createLevel();
    stopIntroMusic();
    if (isMuted == false) {
        startBackgroundMusic();
    }
    world = new World(canvas, keyboard);
}


/** Hide the main menu */
function hideMainMenu() {
    document.getElementById('intro').classList.add('dNone');
    document.getElementById('buttonsMainMenu').classList.add('dNone');
    canvas = document.getElementById('canvas');
}


/** Reset the game world */
function resetWorld() {
    if (world) {
        world.stopDrawing();
        clearAllIntervals();
        world = null;
    }
}


/** Create the level with all enemies, items and background */
function createLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chick(),
            new Chick(),
            new Chick(),
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


/** Return to the main menu and stop fullscreen */
function mainMenu() {
    resetWorld();
    isGamePaused = false;
    isGameOver = false;
    showMainMenu();

    if (document.fullscreenElement) {
        document.exitFullscreen();
        const btn = document.getElementById('fullscreenBtn');
        if (btn) btn.src = "img/background/fullscreen.png";
    }
}


/** Show the main menu */
function showMainMenu() {
    document.getElementById('intro').classList.remove('dNone');
    document.getElementById('buttonsMainMenu').classList.remove('dNone');
    hideGameOverOrWinScreen();
    startIntroMusic();
}


/** Hide all overlays (win/game over/resume) */
function hideGameOverOrWinScreen() {
    document.getElementById('gameOver').classList.add('dNone');
    document.getElementById('youWin').classList.add('dNone');
    document.getElementById('resumeOverlay').classList.add('dNone');
}


/** Pause the game */
function pauseGame() {
    document.getElementById('resumeOverlay').classList.remove('dNone');
    isGamePaused = true;
    if (isMuted == false) {
        stopBackgroundMusic();
        pepe_sleeping_sound.pause();
        pepe_sleeping_sound.currentTime = 0;
    }
}


/** Resume the game */
function resumeGame() {
    document.getElementById('resumeOverlay').classList.add('dNone');
    isGamePaused = false;
    requestAnimationFrame(() => world.draw());
    if (isMuted == false) {
        startBackgroundMusic();
    }
}


/** Reset and restart the game */
function resetGame() {
    isGamePaused = false;
    isGameOver = false;
    hideGameOverOrWinScreen();
    resetWorld();
    createLevel();
    if (isMuted == false) {
        startBackgroundMusic();
    }
    world = new World(canvas, keyboard);
}


/** Clear all active intervals (timers) */
function clearAllIntervals() {
    gameIntervals.forEach(clearInterval);
    gameIntervals = [];
}


// --- INFO & OVERLAY ---


/** Show the How to Play screen */
function howToPlay() {
    document.getElementById('howToPlayOverlay').classList.remove('dNone');
}


/** Close the How to Play screen */
function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('dNone');
}


/** Show the Impressum screen */
function openImpressum() {
    document.getElementById('impressumOverlay').classList.remove('dNone');
}


/** Close the Impressum screen */
function closeImpressum() {
    document.getElementById('impressumOverlay').classList.add('dNone');
}


// --- SCREEN ORIENTATION ---


/** Check if device is in correct screen mode */
function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth < 1400;
    const orientationMessage = document.getElementById('orientationMessage');
    const mobileButtons = document.getElementById('mobileButtons');

    if (isMobile && isPortrait) {
        orientationMessage.style.display = 'flex';
        mobileButtons.classList.remove('dNone');
    } else {
        orientationMessage.style.display = 'none';
        mobileButtons.classList.add('dNone');
    }

    updadteSound();
}


// --- SOUND TOGGLE ---


/** Toggle mute/unmute */
function toggleSound() {
    let sound = document.getElementById('sound');
    if (isMuted === true) {
        soundOn();
        sound.src = "img/background/volume.png";
    } else {
        soundOff();
        sound.src = "img/background/mute.png";
    }
}


/** Update the sound icon on screen */
function updadteSound() {
    const soundIcon = document.getElementById('sound');
    soundIcon.src = isMuted ? "img/background/mute.png" : "img/background/volume.png";
}


/** Enable sound */
function soundOn() {
    isMuted = false;
    localStorage.setItem('isMuted', isMuted);
    background_music.play();
}


/** Disable all sounds */
function soundOff() {
    isMuted = true;
    localStorage.setItem('isMuted', isMuted.toString());
    background_music.pause();
    chicken_sound.pause();
    click_sound.pause();
    endboss_hurt_sound.pause();
    endboss_death_sound.pause();
    pepe_walking_sound.pause();
    pepe_jump_sound.pause();
    pepe_hurt_sound.pause();
    pepe_sleeping_sound.pause();
    bottle_throw_sound.pause();
    bottle_splash_sound.pause();
    collect_bottle_sound.pause();
    collect_coin_sound.pause();
    gameover_sound.pause();
    win_sound.pause();
}


// --- FULLSCREEN ---


/** Toggle fullscreen mode */
function fullscreen() {
    const fullscreenElement = document.getElementById('fullscreen');
    const btn = document.getElementById('fullscreenBtn');

    if (!document.fullscreenElement) {
        fullscreenElement.requestFullscreen();
        btn.src = "img/background/exit.png";
    } else {
        document.exitFullscreen();
        btn.src = "img/background/fullscreen.png"; 
    }
}





















