class Chick extends MovableObject {
    y = 360;
    height = 80;
    width = 70;
    isDead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 1200 + Math.random() * 1500;
        this.speed = 0.5 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        const moveInterval = setInterval(() => {
            if(isGamePaused || isGameOver) return;
            this.moveLeft();
        }, 1000 / 60);
        
        const walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 200);

        gameIntervals.push(moveInterval, walkingInterval);
    }

    die() {
        this.isDead = true;
        this.loadImage(this.IMAGES_DEAD[0]);
        setTimeout(() => {

        }, 1000);
    }



}