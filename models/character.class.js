class Character extends MovableObject {
    height = 280;
    width = 120;
    y = 155;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;
    speed = 6;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.gameWorld.keyboard.RIGHT && this.x < this.gameWorld.level.level_end_x) {           //this.gameWorld ist world instanz -> world.class.js
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.gameWorld.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;

            }
            this.gameWorld.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            if (this.gameWorld.keyboard.RIGHT ||this.gameWorld.keyboard.LEFT ) {
                //walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];       //picks img from cache
                this.currentImage++;
            }
        }, 150);
    }

  
}

