/**
 * Represents a small chicken enemy (chick).
 * The chick walks from right to left and can die when jumped on.
 */
class Chick extends MovableObject {
    y = 360;
    height = 80;
    width = 70;
    isDead = false;


    // Animation image arrays
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    
     /**
     * Creates a new chick enemy with random position and speed.
     * Loads all necessary images and starts animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 1200 + Math.random() * 1500;
        this.speed = 0.5 + Math.random() * 0.25;

        this.animate();
    }


    /**
     * Starts two animations:
     * 1. Movement to the left
     * 2. Walking image animation (if not dead)
     */
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


    /**
     * Kills the chick.
     * Shows the dead image and stops the walking animation.
     */
    die() {
        this.isDead = true;
        this.loadImage(this.IMAGES_DEAD[0]);
        setTimeout(() => {

        }, 1000);
    }
}