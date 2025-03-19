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
    throwableObjects = [];
    bossHits = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.generateClouds();
        this.draw();
        this.setWorld();
        this.run();
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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollisions();
            this.checkSalsaCollisions();
            this.checkThrowObjects();
            this.checkSalsaCollisionEnemy();
        }, 20);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.salsabar.collectedSalsa > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y);
            this.throwableObjects.push(bottle);


            this.salsabar.collectedSalsa -= 20;
            this.salsabar.setCollectedSalsa(this.salsabar.collectedSalsa);


        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.character.jump();
                enemy.die();
                this.level.enemies.splice(index, 1);
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthbar.setPercentage(this.character.energy);
                if (enemy instanceof Endboss) {
                    enemy.attack();
                    this.character.hit();
                    this.healthbar.setPercentage(this.character.energy);

                }
            }
        });
    }


    checkSalsaCollisionEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !bottle.explodes) {
                    bottle.splash();
                    if (enemy instanceof Endboss) {
                        enemy.getHit();
                        this.bossHits++;
                        this.bossbar.setBossHits(this.bossHits);
                    } else {
                        enemy.die();
                        this.level.enemies.splice(enemyIndex, 1);
                        setTimeout(() => {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }, 500);
                    }
                }
            });
        });
    }

    checkCoinCollisions() {
        this.level.coin.forEach((c, index) => {
            if (this.character.isColliding(c)) {
                this.level.coin.splice(index, 1);
                this.coinbar.collectedCoins += 20;
                this.coinbar.setCollectedCoins(this.coinbar.collectedCoins);
            }

            if (this.coinbar.collectedCoins >= 2) {
                this.level.enemies.forEach(enemy => {
                    if (enemy instanceof Endboss) {
                        enemy.startWalking();
                    }
                })
            }
        })
    }

    checkSalsaCollisions() {
        this.level.salsa.forEach((s, index) => {
            if (this.character.isColliding(s)) {
                this.level.salsa.splice(index, 1);
                this.salsabar.collectedSalsa += 20;
                this.salsabar.setCollectedSalsa(this.salsabar.collectedSalsa);
            }
        });
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
        this.addObjectsToMap(this.throwableObjects);

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