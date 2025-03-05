class MovableObject {
    x = 200;
    y = 400;
    img;


    loadImage(path) {
        this.img = new Image();   //this.img = document.getElementById('image')<img id="image" src="">
    }

    moveRight() {
        console.log('moving right');

    }

    moveLeft() {

    }
}