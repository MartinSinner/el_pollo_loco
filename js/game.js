let canvas;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}

function resetGame(){
    const gameOver = document.getElementById('gameOver');
    gameOver.classList.add('dNone');
    
    if(world) {
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




