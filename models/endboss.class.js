class Endboss extends MovableObject {
    y = 150;
    x = 4800;
    width = 300;
    height = 300;
    hitCount = 0;
    speed = 0.8;
    isMoving = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead) {
                this.die();
            } else if (this.isMoving && !this.isAttacking && !this.isHurt && this.speed !== 0) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK)
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }

        }, 200);
    }

    startWalking() {
        this.isMoving = true;
        this.moveLeft();
        this.speed = speed;
    }

    attack() {
        if (!this.isAttacking && !this.isHurt && !this.isDead) {
            this.isAttacking = true;
            this.speed = 0;
            setTimeout(() => {
                this.isAttacking = false;
                this.speed = 3;
            }, 200);
        }
    }
    
    die() {
        if (!this.isDead) {
            this.isDead = true;
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

}