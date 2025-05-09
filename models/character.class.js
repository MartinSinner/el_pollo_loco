/**
 * This class creates the main character Pepe.
 * Pepe can walk, jump, get hurt, die, or even sleep when idle.
 * The class controls all movement and animation for Pepe.
 */
class Character extends MovableObject {
    height = 280;
    width = 140;
    y = 150;
    standingTimer = 0;
    sleepingTimer = 0;
    isDeadAnimation = false;
    speed = 8;


    // Animation image arrays
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];


    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];




    /**
    * Creates the character and loads all animation images.
    * Also applies gravity and starts movement + animation loop.
    */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadAllImages();
        this.applyGravity();
        this.animate();
    }


    /**
     * Loads all needed animation images into cache.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
    }


    /**
     * Starts repeating functions for movement and animation.
     */
    animate() {
        let movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
        let animationsInterval = setInterval(() => this.handleAnimations(), 150);
        gameIntervals.push(movementInterval, animationsInterval);
    }


    /**
    * Handles key inputs and moves character based on pressed keys.
    */
    handleMovement() {
        const kb = this.gameWorld.keyboard;
        if (kb.RIGHT && this.x < this.gameWorld.level.level_end_x) this.moveRightAction();
        if (kb.LEFT && this.x > 0) this.moveLeftAction();
        if (kb.SPACE && this.y >= 150 && !this.isHurt()) this.jumpAction();
        this.gameWorld.camera_x = -this.x + 100;
    }


     /**
     * Pepe moves right.
     */
    moveRightAction() {
        this.moveRight();
        this.standingTimer = 0;
    }


    /**
     * Pepe moves left.
     */
    moveLeftAction() {
        this.moveLeft();
        this.otherDirection = true;
        this.standingTimer = 0;
    }


    /**
     * Pepe jumps.
     */
    jumpAction() {
        this.jump();
        this.standingTimer = 0;
    }


    /**
     * Chooses the correct animation based on the character's state.
     */
    handleAnimations() {
        if (isGamePaused || isGameOver) return;

        if (this.isDeadAnimation) return this.playAnimation(this.IMAGES_DEAD);
        if (this.isDead() && !this.isDeadAnimation) return this.handleDeath();
        if (this.isHurt()) return this.playAnimation(this.IMAGES_HURT);
        if (this.isAboveGround()) return this.playAnimation(this.IMAGES_JUMPING);

        const kb = this.gameWorld.keyboard;
        const isIdle = !kb.RIGHT && !kb.LEFT;

        isIdle ? this.standingTimer += 0.1 : this.standingTimer = 0;

        if (isIdle && this.standingTimer >= 4 && !isGamePaused) return this.sleeping();
        if (isIdle) return this.standing();

        this.walking();
    }


    /**
     * Plays the sleeping animation.
     */
    sleeping() {
        this.playAnimation(this.IMAGES_SLEEPING);
        if (isMuted == false) {
            pepe_sleeping_sound.play();
        }
    }


     /**
     * Plays the standing (idle) animation.
     */
    standing() {
        this.playAnimation(this.IMAGES_STANDING);
        if (isMuted == false) {
            pepe_walking_sound.pause();
        }
    }


    /**
     * Plays the walking animation.
     */
    walking() {
        this.playAnimation(this.IMAGES_WALKING);
        if (isMuted == false) {
            pepe_sleeping_sound.pause();
            pepe_walking_sound.play();
        }
    }


    /**
     * Handles the death animation and starts game over screen.
     */
    handleDeath() {
        this.isDeadAnimation = true;
        this.currentImage = 0;
        setTimeout(() => this.gameOver(), this.IMAGES_DEAD.length * 120);
    }


    /**
     * Shows game over screen and stops all sounds.
     */
    gameOver() {
        let gameOver = document.getElementById('gameOver');
        gameOver.classList.remove('dNone');
        isGameOver = true;

        if (isMuted == false) {
            gameover_sound.play();
            stopBackgroundMusic();

            pepe_sleeping_sound.pause();
            pepe_sleeping_sound.currentTime = 0;

            pepe_hurt_sound.pause();
            pepe_hurt_sound.currentTime = 0;

            pepe_walking_sound.pause();
            pepe_walking_sound.currentTime = 0;
        }
    }
}

