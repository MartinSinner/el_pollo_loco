let canvas;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}

function resetGame(){
    const gameOver = document.getElementById('gameOver');
    gameOver.classList.add('dNone');
    world.character.energy = 100;
}

