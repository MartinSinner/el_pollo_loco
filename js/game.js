let canvas;
let keyboard = new Keyboard();
let world;
let intro_music = new Audio('audio/audio_intro.mp3');
intro_music.volume = 0.5;
let background_music = new Audio('audio/audio_backgroundmusic.mp3');
background_music.volume = 0.05;
let click_sound = new Audio('audio/click.mp3');

let chicken_sound = new Audio('audio/audio_chicken.mp3');
chicken_sound.volume = 0.5;
let chick_sound = new Audio('audio/audio_chick.mp3');
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

let isMuted = localStorage.getItem('isMuted') === "true";

let isGamePaused = false;
let isGameOver = false;




// Audio & Music

document.addEventListener('DOMContentLoaded', () => {
    const firstClickScreen = document.getElementById('firstClickScreen');

    firstClickScreen.addEventListener('click', () => {
        startIntroMusic();
        firstClickScreen.classList.add('dNone');
        document.getElementById('buttonsMainMenu').classList.remove('dNone');
        document.getElementById('intro').classList.remove('dNone');
    });
});

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const sound = document.getElementById('buttonSound');
        sound.currentTime = 0;
        sound.play();
    });

});


function startIntroMusic() {
    if (!isMuted) {
        intro_music.play();
    }
}

function stopIntroMusic() {
    intro_music.pause();
}

function startBackgroundMusic() {
    background_music.play();
}

function stopBackgroundMusic() {
    background_music.pause();
}

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
    startIntroMusic();
}


function hideGameOverOrWinScreen() {
    document.getElementById('gameOver').classList.add('dNone');
    document.getElementById('youWin').classList.add('dNone');
    document.getElementById('resumeOverlay').classList.add('dNone');
}


function pauseGame() {
    document.getElementById('resumeOverlay').classList.remove('dNone');
    isGamePaused = true;
    if (isMuted == false) {
        stopBackgroundMusic();

        pepe_sleeping_sound.pause();
        pepe_sleeping_sound.currentTime = 0;
    }

}


function resumeGame() {
    document.getElementById('resumeOverlay').classList.add('dNone');
    isGamePaused = false;
    requestAnimationFrame(() => world.draw());
    if (isMuted == false) {
        startBackgroundMusic();
    }

}


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


window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);

function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth < 800;
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

function updadteSound() {
    const soundIcon = document.getElementById('sound');
    soundIcon.src = isMuted ? "img/background/mute.png" : "img/background/volume.png";
}

function soundOn() {
    isMuted = false;
    localStorage.setItem('isMuted', isMuted);
    background_music.play();
}

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











