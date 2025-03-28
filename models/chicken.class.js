/**
 * Represents a normal-sized chicken enemy.
 * This chicken walks from right to left and can be defeated by jumping on it.
 */
class Chicken extends MovableObject {
    y = 340;
    height = 100;
    width = 80;
    isDead = false;


    // Animation image arrays
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    /**
     * Creates a new chicken enemy with random position and speed.
     * Loads the images and starts animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 800 + Math.random() * 1500;
        this.speed = 0.3 + Math.random() * 0.25;

        this.animate();
    }


     /**
     * Starts movement and walking animation.
     */
    animate() {
        const moveInterval = setInterval(() => {
            if (isGamePaused || isGameOver) return;
            this.moveLeft();
        }, 1000 / 60);

        const walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 200);

        gameIntervals.push(moveInterval, walkingInterval)
    }

    
    /**
     * Kills the chicken and shows the dead image.
     */
    die() {
        this.isDead = true;
        this.loadImage(this.IMAGES_DEAD[0]);
        setTimeout(() => {

        }, 1000);
    }
}