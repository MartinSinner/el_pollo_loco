/**
 * This class is for all moving objects in the game (like the character or enemies).
 * It extends DrawableObject and adds movement, jumping, gravity and collision logic.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isJumping = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 50,
        right: 0
    }


    /**
     * Adds gravity to the object so it falls down or jumps.
     */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
                if (this.y > this.jumpStartY) {
                    this.y = this.jumpStartY;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);

        gameIntervals.push(gravityInterval);
    }


    /**
     * Checks if the object is above the ground.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150
        }
    }


    /**
     * Plays animation frames from a given image array.
     * @param {Array} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];       //picks img from cache
        this.currentImage++;
    }


    /** Moves the object to the left */
    moveLeft() {
        this.x -= this.speed;
    }


    /** Moves the object to the right */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    /** Makes the object jump */
    jump() {
        if (!this.isAboveGround()) {
            this.jumpStartY = this.y;
        }

        this.speedY = 30;

        if (isMuted == false) {
            pepe_jump_sound.currentTime = 0;
            pepe_jump_sound.play();
            pepe_walking_sound.pause();
        }
    }


     /**
     * Checks if this object touches another object.
     * @param {MovableObject} mo - Another movable object.
     * @returns {boolean}
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&           
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&         
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&           
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom            
        );
    }


    /**
     * Reduces the object's energy (takes damage).
     * @param {number} [damage=10] - Amount of energy to subtract.
     */
    hit(damage = 10) {
        let now = new Date().getTime();
        if (now - this.lastHit > 400) {
            this.energy -= damage;
            if (this.energy <= 0) {
                this.energy = 0;
            } else {
                this.lastHit = now;
                if (isMuted == false) {
                    pepe_hurt_sound.currentTime = 0;
                    pepe_hurt_sound.play();
                }
            }
        }
    }


    /**
     * Checks if the object was recently hit.
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;     
        timepassed = timepassed / 1000;                         
        return timepassed < 1;
    }


    /**
     * Checks if the object has no more energy.
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }
}
