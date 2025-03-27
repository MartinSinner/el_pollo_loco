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

    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

        gameIntervals.push(gravityInterval);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];       //picks img from cache
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    jump() {
        this.speedY = 30;
        if (isMuted == false) {
            pepe_jump_sound.currentTime = 0;
            pepe_jump_sound.play();
    
            pepe_walking_sound.pause();
        }
       
    }

    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&           // R -> L = Rechte Kante von Pepe berührt linke Kante der Flasche
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&         // T -> B = Obere Kante von Pepe berührt untere Kante der Flasche
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&           // L -> R = Linke Kante von Pepe berührt rechte Kante der Flasche
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom            // B -> T = Untere Kante von Pepe berührt obere Kante der Flasche
        );
    }

    hit() {
        let now = new Date().getTime();
        if (now - this.lastHit > 400) { 
            this.energy -= 10;
    
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
    

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;     //differenz in milisek
        timepassed = timepassed / 1000;                         //differenz in sek


        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
        

    }
}
