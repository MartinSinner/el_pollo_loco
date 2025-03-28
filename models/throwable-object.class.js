/**
 * This class creates a throwable salsa bottle.
 * It rotates while flying and shows a splash animation when hitting the ground.
 * Inherits from MovableObject.
 */
class ThrowableObject extends MovableObject {
    explodes = false;

    IMAGES_ROTATION_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * Creates a salsa bottle that can be thrown left or right.
     * @param {number} x - The horizontal starting position.
     * @param {number} y - The vertical starting position.
     * @param {boolean} [throwToLeft=false] - Whether to throw the bottle to the left.
     */
    constructor(x, y, throwToLeft = false) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throwToLeft = throwToLeft; 
        this.throw();
    }


    /**
     * Starts the throwing animation and movement.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();

        let interval = setInterval(() => {
            if (!this.explodes) {
                this.x += this.throwToLeft ? -10 : 10;
                this.speedY -= 1;
                this.playAnimation(this.IMAGES_ROTATION_BOTTLE);
                if(isMuted == false){
                    bottle_throw_sound.currentTime = 0;
                    bottle_throw_sound.play();
                } 
            }

            if (!this.isBottleAboveGround() && !this.explodes) {
                this.splash();
                clearInterval(interval);
            }
        }, 25);

        gameIntervals.push(interval)
    }


    /**
     * Checks if the bottle is still in the air.
     * @returns {boolean} True if above the ground.
     */
    isBottleAboveGround() {
        return this.y < 360;
    }


    /**
     * Shows the splash animation and stops movement.
     */
    splash() {
        this.explodes = true;
          this.speedY = 0;
       
        this.playAnimation(this.IMAGES_SPLASH_BOTTLE);
        if (isMuted == false) {
            bottle_splash_sound.play();
        }
    }
}