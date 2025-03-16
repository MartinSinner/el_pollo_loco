class World {
    character = new Character();
    level = level1;
    clouds = [];
    backgroundObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coinbar = new Coinbar();
    salsabar = new Salsabar();
    healthbar = new Healthbar();
    bossbar = new Bossbar();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.generateClouds();
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    generateClouds() {
        let x = -500;
        for (let i = 0; i < 1000; i++) {
            let randomDistance = 400 + Math.random() * 300;
            let imageNumber = (i % 2 === 0) ? 1 : 2;

            x += randomDistance;

            this.clouds.push(
                new Cloud(`img/5_background/layers/4_clouds/${imageNumber}.png`, x)
            );
        }
    }

    generateBackground() {
        for (let i = 0; i < 1000; i++) {
            let offset = i * 719;
            let imageNumber = (i % 2 === 0) ? 1 : 2;

            this.backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/air.png', offset),
                new BackgroundObject(`img/5_background/layers/3_third_layer/${imageNumber}.png`, offset),
                new BackgroundObject(`img/5_background/layers/2_second_layer/${imageNumber}.png`, offset),
                new BackgroundObject(`img/5_background/layers/1_first_layer/${imageNumber}.png`, offset),
            )
        }
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.healthbar.setPercentage(this.character.energy);
                }
            });
        }, 200);
    }

    setWorld() {
        this.character.gameWorld = this;            // = this -> ganze World Instanz, World wird in character gespeichert (in character.js this.world ausreichend)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.backgroundObjects);


        this.addObjectsToMap(this.level.enemies);
        this.clouds.forEach(cloud => cloud.moveLeft());
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.level.salsa);
        this.addObjectsToMap(this.level.coin);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.salsabar);
        this.addToMap(this.bossbar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);



        let self = this;
        requestAnimationFrame(function () {         //sets framerate 
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {                                      //mo = MovableObject
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);        //causes displacement
        this.ctx.scale(-1, 1);                  // causes reflection of the image
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}