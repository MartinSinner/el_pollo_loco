class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];


    loadImage(path) {
        this.img = new Image();   //this.img = document.getElementById('image')<img id="image" src="">
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {

            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
        console.log('moving right');

    }

    moveLeft() {
        console.log('moving left');

    }
}