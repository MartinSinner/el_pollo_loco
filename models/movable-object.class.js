class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    speed = 0.15;


    loadImage(path) {
        this.img = new Image();   //this.img = document.getElementById('image')<img id="image" src="">
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {

            let img = new Image();
            img.src = path;     //loading procces browser
            this.imageCache[path] = img;        //saves all img 
        });
    }


    moveRight() {
        console.log('moving right');

    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}