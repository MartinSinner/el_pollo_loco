let canvas;
let world; 



function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    console.log('my character is', world.character); 
    console.log('my enemy is' , world.enemies);
     
}