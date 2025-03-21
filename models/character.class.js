class Character extends MovableObject {
    height = 280;
    width = 120;
    y = 60;
    standingTimer = 0;
    sleepingTimer = 0;

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

    speed = 8;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadAllImages();
        this.applyGravity();
        this.animate();
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
    }

    animate() {
        let movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
        let animationsInterval = setInterval(() => this.handleAnimations(), 100);

        gameIntervals.push(movementInterval, animationsInterval);
    }

    handleMovement() {
        const kb = this.gameWorld.keyboard;
        if (kb.RIGHT && this.x < this.gameWorld.level.level_end_x) this.moveRightAction();
        if (kb.LEFT && this.x > 0) this.moveLeftAction();
        if (kb.SPACE && this.y >= 150) this.jumpAction();
        this.gameWorld.camera_x = -this.x + 100;
    }

    moveRightAction() {
        this.moveRight();
        this.standingTimer = 0;
    }

    moveLeftAction() {
        this.moveLeft();
        this.otherDirection = true;
        this.standingTimer = 0;
    }

    jumpAction() {
        this.jump();
        this.standingTimer = 0;
    }

    handleAnimations() {
        const kb = this.gameWorld.keyboard;
        if (!kb.RIGHT && !kb.LEFT) this.standingTimer += 0.1;
        else this.standingTimer = 0;

        if (this.isDead() && !this.isDeadAnimation) return this.handleDeath();
        if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
        else if (this.standingTimer >= 3) this.playAnimation(this.IMAGES_SLEEPING);
        else if (!kb.RIGHT && !kb.LEFT) this.playAnimation(this.IMAGES_STANDING);
        else this.playAnimation(this.IMAGES_WALKING);
    }

    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        this.isDeadAnimation = true;
        this.gameOver();
    }

    gameOver() {
        let gameOver = document.getElementById('gameOver');
        gameOver.classList.remove('dNone');
    }

}

