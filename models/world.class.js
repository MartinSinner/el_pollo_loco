class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coinbar = new Coinbar();
    salsabar = new Salsabar();
    healthbar = new Healthbar();
    bossbar = new Bossbar();
    throwableObjects = [];
    canThrow = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        let runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollisions();
            this.checkSalsaCollisions();
            this.checkThrowObjects();
            this.checkSalsaCollisionEnemy();
        }, 20);

        gameIntervals.push(runInterval);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.salsabar.collectedSalsa > 0 && this.canThrow) {
            this.canThrow = false;

            let bottle = new ThrowableObject(this.character.x + 100, this.character.y);
            this.throwableObjects.push(bottle);


            this.salsabar.collectedSalsa -= 20;
            this.salsabar.setCollectedSalsa(this.salsabar.collectedSalsa);


            setTimeout(() => {
                this.canThrow = true;
            }, 1000);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.character.jump();
                if (!(enemy instanceof Endboss)) {
                    enemy.die();
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 300);
                }

            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthbar.setPercentage(this.character.energy);
                if (enemy instanceof Endboss) {
                    enemy.attack();
                    this.character.hit();
                    this.healthbar.setPercentage(this.character.energy);

                }
            }

            if (enemy instanceof Endboss) {
                let distanceToPepe = enemy.x - this.character.x;
                if (distanceToPepe < 500) {
                    this.bossbar.isVisible = true;
                }
            }
        });
    }


    checkSalsaCollisionEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                let bottleHitsEnemy = 
                    bottle.x + bottle.width > enemy.x + enemy.width * 0.2 && 
                    bottle.y + bottle.height > enemy.y + enemy.height * 0.3; 
    
                if (bottleHitsEnemy && !bottle.explodes) {
                    bottle.splash();
                    bottle.speedY = 0;  
                    bottle.x = bottle.x; 
                    bottle.y = enemy.y + enemy.height * 0.2; 
    
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        let bossHealth = (enemy.hitCount / enemy.maxHitCount) * 100;
                        this.bossbar.setPercentage(bossHealth);
                    } else {
                        enemy.die();
                        setTimeout(() => {
                            this.level.enemies.splice(enemyIndex, 1);
                        }, 600);
                    }
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 200);
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


        this.addObjectsToMap(this.level.backgroundObjects);


        this.addObjectsToMap(this.level.enemies);
        this.level.clouds.forEach(cloud => cloud.moveLeft());
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsa);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.salsabar);

        if (this.bossbar.isVisible) {
            this.addToMap(this.bossbar);
        }
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