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



    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        let interval = setInterval(() => {
            if (!this.explodes) {
                this.x += 10;
                this.speedY -= 1;
                this.playAnimation(this.IMAGES_ROTATION_BOTTLE);
            }

            if (!this.isBottleAboveGround() && !this.explodes) {
                this.splash();
                clearInterval(interval);
            }
        }, 25);

        gameIntervals.push(interval)
    }

    isBottleAboveGround() {
        return this.y < 360;
    }

    splash() {
        this.explodes = true;
          this.speedY = 0;
       
        this.playAnimation(this.IMAGES_SPLASH_BOTTLE);
    }


}