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
    animationFrameId;


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
            if (isGamePaused) return;
            this.checkAll()
        }, 20);

        gameIntervals.push(runInterval);
    }


    checkAll() {
        this.checkCollisions();
        this.checkCoinCollisions();
        this.checkSalsaCollisions();
        this.checkThrowObjects();
        this.checkSalsaCollisionEnemy();
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.salsabar.collectedSalsa > 0 && this.canThrow) {
            this.canThrow = false;

            let bottle = new ThrowableObject(
                this.character.x + (this.character.otherDirection ? -10 : 100), 
                this.character.y,
                this.character.otherDirection 
            );
            
            this.throwableObjects.push(bottle);


            this.salsabar.collectedSalsa -= 20;
            this.salsabar.setCollectedSalsa(this.salsabar.collectedSalsa);


            setTimeout(() => this.canThrow = true, 1000);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) this.handleEnemyCollision(enemy, index);
            if (enemy instanceof Endboss) this.showBossbarIfNear(enemy);
        });
    }


    handleEnemyCollision(enemy, index) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
            this.handleStompEnemy(enemy, index);
        } else if (!this.character.isAboveGround()) {
            this.character.hit();
            this.healthbar.setPercentage(this.character.energy);
            if (enemy instanceof Endboss) this.knockbackBoss(enemy);
        }
    }


    handleStompEnemy(enemy, index) {
        if (!(enemy instanceof Endboss)) {
            this.character.jump();
            if (isMuted == false) this.playEnemySound(enemy);
            this.removeEnemy(enemy, index);
        } else {
            this.character.hit();
            this.healthbar.setPercentage(this.character.energy);
            this.knockbackBoss();
            
        }
    }


    knockbackBoss(enemy){
        this.character.x -= 20; 
        enemy.attack();
    }


    playEnemySound(enemy){
        if (enemy instanceof Chicken) {
            chicken_sound.play();
        } else if (enemy instanceof Chick) {
            chick_sound.play();
        }
    }


    showBossbarIfNear(enemy) {
        let distanceToPepe = enemy.x - this.character.x;
        if (distanceToPepe < 500) {
            this.bossbar.isVisible = true;
        }
    }


    removeEnemy(enemy, index) {
        enemy.die();
        setTimeout(() => this.level.enemies.splice(index, 1), 300);
    }


    checkSalsaCollisionEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.bottleHitsEnemy(bottle, enemy) && !bottle.explodes) {
                    this.handleBottleHits(bottle, bottleIndex, enemy, enemyIndex);
                }
            });
        })
    }


    bottleHitsEnemy(bottle, enemy) {
        return bottle.x < enemy.x + enemy.width &&
               bottle.x + bottle.width > enemy.x &&
               bottle.y < enemy.y + enemy.height &&
               bottle.y + bottle.height > enemy.y;
    }
    

    handleBottleHits(bottle, bottleIndex, enemy, enemyIndex) {
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
            setTimeout(() => this.level.enemies.splice(enemyIndex, 1), 600);
        }
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 200);
    }



    checkCoinCollisions() {
        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) this.collectCoin(index);
        })
    }


    collectCoin(index) {
        this.level.coin.splice(index, 1);
        this.coinbar.collectedCoins += 20;
        this.coinbar.setCollectedCoins(this.coinbar.collectedCoins);
        if (this.coinbar.collectedCoins >= 2) {
            this.activateEndboss();
            if (isMuted == false) {
                collect_coin_sound.play(); 
            }
            
        }
    }


    activateEndboss() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) enemy.startWalking();
        });
    }


    checkSalsaCollisions() {
        this.level.salsa.forEach((salsa, index) => {
            if (this.character.isColliding(salsa)) {
                this.collectSalsa(index)
                if (isMuted == false) {
                    collect_bottle_sound.play();
                }
                
            } 
        });
    }


    collectSalsa(index) {
        this.level.salsa.splice(index, 1);
        this.salsabar.collectedSalsa += 20;
        this.salsabar.setCollectedSalsa(this.salsabar.collectedSalsa);
    }


    setWorld() {
        this.character.gameWorld = this;            // = this -> ganze World Instanz, World wird in character gespeichert (in character.js this.world ausreichend)
    }


    draw() {
        if (isGamePaused || isGameOver) return;
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawGameObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawBars();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }

    stopDrawing() {
        cancelAnimationFrame(this.animationFrameId);
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }


    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }


    drawGameObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.level.clouds.forEach(cloud => cloud.moveLeft());
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsa);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObjects);
    }


    drawBars() {
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.salsabar);
        if (this.bossbar.isVisible) this.addToMap(this.bossbar);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o))
    }


    addToMap(mo) {                                      //mo = MovableObject
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawBorder(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
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



