/**
 * The World class represents the entire game world.
 * It handles drawing, collisions, movement, throwing bottles, collecting items, and enemy interactions.
 */
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


    /**
     * Creates a new World.
     * @param {HTMLCanvasElement} canvas - The canvas where the game is drawn.
     * @param {Keyboard} keyboard - The keyboard input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Starts the main game loop.
     */
    run() {
        let runInterval = setInterval(() => {
            if (isGamePaused) return;
            this.checkAll()
        }, 20);
        gameIntervals.push(runInterval);
    }


    /**
     * Calls all collision and interaction checks.
     */
    checkAll() {
        this.checkCollisions();
        this.checkCoinCollisions();
        this.checkSalsaCollisions();
        this.checkThrowObjects();
        this.checkSalsaCollisionEnemy();
    }


    /**
     * Checks if the player is allowed to throw and creates a throwable bottle.
     */
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


    /**
     * Checks collision between character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) this.handleEnemyCollision(enemy, index);
            if (enemy instanceof Endboss) this.showBossbarIfNear(enemy);
        });
    }


    /**
     * Handles collisions with enemies (jumping on or being hit).
     * @param {MovableObject} enemy - The enemy collided with.
     * @param {number} index - The index of the enemy.
     */
    handleEnemyCollision(enemy, index) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
            this.handleStompEnemy(enemy, index);
        } else if (!this.character.isAboveGround()) {
            let damage = (enemy instanceof Endboss) ? 20 : 10;

            this.character.hit(damage);
            this.healthbar.setPercentage(this.character.energy);

            if (enemy instanceof Endboss) this.knockbackBoss(enemy);
        }
    }


    /**
     * Handles enemy being stomped on by the character.
     */
    handleStompEnemy(enemy, index) {
        if (!(enemy instanceof Endboss)) {
            this.character.jump();
            if (isMuted == false) this.playEnemySound(enemy);
            this.removeEnemy(enemy, index);
        } else {
            this.character.hit(20);
            this.healthbar.setPercentage(this.character.energy);
            this.knockbackBoss(enemy); 
        }
    }


    /**
     * Plays sound for chicken or chick enemy.
     */
    playEnemySound(enemy){
        if (enemy instanceof Chicken) {
            chicken_sound.play();
        } else if (enemy instanceof Chick) {
            chick_sound.play();
        }
    }


    /**
     * Pushes the Pepe back when hit by the endboss.
     */
    knockbackBoss(enemy){
        this.character.x -= 20; 
        enemy.attack();
    }


    /**
     * Shows the boss health bar when the character is close.
     */
    showBossbarIfNear(enemy) {
        let distanceToPepe = enemy.x - this.character.x;
        if (distanceToPepe < 500) {
            this.bossbar.isVisible = true;
        }
    }


    /**
     * Removes the enemy from the level after a delay.
     */
    removeEnemy(enemy, index) {
        enemy.die();
        setTimeout(() => this.level.enemies.splice(index, 1), 300);
    }


    /**
     * Checks if a thrown bottle hits any enemy.
     */
    checkSalsaCollisionEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.bottleHitsEnemy(bottle, enemy) && !bottle.explodes) {
                    this.handleBottleHits(bottle, bottleIndex, enemy, enemyIndex);
                }
            });
        });
    }


    /**
     * Checks collision between bottle and enemy.
     */
    bottleHitsEnemy(bottle, enemy) {
        return bottle.x < enemy.x + enemy.width &&
               bottle.x + bottle.width > enemy.x &&
               bottle.y < enemy.y + enemy.height &&
               bottle.y + bottle.height > enemy.y;
    }
    

    /**
     * Handles what happens when a bottle hits an enemy.
     */
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


    /**
     * Checks if the character collects a coin.
     */
    checkCoinCollisions() {
        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) this.collectCoin(index);
        })
    }


    /**
     * Collects coin and increases counter.
     */
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


    /**
     * Starts the endboss movement.
     */
    activateEndboss() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) enemy.startWalking();
        });
    }


    /**
     * Checks if the character collects a salsa bottle.
     */
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


    /**
     * Collects salsa and updates the bar.
     */
    collectSalsa(index) {
        this.level.salsa.splice(index, 1);
        this.salsabar.collectedSalsa += 20;
        this.salsabar.setCollectedSalsa(this.salsabar.collectedSalsa);
    }


    /**
     * Assigns the World to the character. Whole world instance is stored in character
     */
    setWorld() {
        this.character.gameWorld = this;           
    }


    /**
     * Draws the whole game world.
     */
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


    /**
     * Stops drawing the game.
     */
    stopDrawing() {
        cancelAnimationFrame(this.animationFrameId);
    }


    /**
     * Clears everything from the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }


    /**
     * Draws the background objects.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }


    /**
     * Draws all enemies, clouds, items, and projectiles.
     */
    drawGameObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.level.clouds.forEach(cloud => cloud.moveLeft());
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsa);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Draws all status bars.
     */
    drawBars() {
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.salsabar);
        if (this.bossbar.isVisible) this.addToMap(this.bossbar);
    }


    /**
     * Draws multiple objects on the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o))
    }


    /**
     * Draws one object on the canvas with direction check.
     * @param {MovableObject} mo
     */
    addToMap(mo) {                                     
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawBorder(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }


    /**
     * Flips image to the left side. Causes reflection & displacement of the image
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);        
        this.ctx.scale(-1, 1);                  
        mo.x = mo.x * -1;
    }

    
    /**
     * Flips image back to original side.
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}



