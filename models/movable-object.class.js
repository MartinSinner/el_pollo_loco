class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {

        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }

    isAboveGround() {
        return this.y < 150
    }


    loadImage(path) {
        this.img = new Image();   //this.img = document.getElementById('image')<img id="image" src="">
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    loadImages(array) {
        array.forEach((path) => {

            let img = new Image();
            img.src = path;     //loading procces browser
            this.imageCache[path] = img;        //saves all img 
        });
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
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&        // R -> L = Rechte Kante von Pepe berührt linke Kante der Flasche
            this.y + this.height > mo.y &&         // T -> B = Obere Kante von Pepe berührt untere Kante der Flasche
            this.x < mo.x + mo.width &&            // L -> R = Linke Kante von Pepe berührt rechte Kante der Flasche
            this.y < mo.y + mo.height               // B -> T = Untere Kante von Pepe berührt obere Kante der Flasche
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;     //differenz in milisek
        timepassed = timepassed / 1000;                         //differenz in sek
        console.log(timepassed);
        
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
}
