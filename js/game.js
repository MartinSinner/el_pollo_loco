let canvas;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}

function resetGame() {
    document.getElementById('loadingScreen').classList.remove('dNone'); // GIF anzeigen

    setTimeout(() => {
        location.reload(); // Nach 1 Sekunde das Spiel neu laden
    }, 1000);
}



