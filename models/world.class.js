class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = [];
    backgroundObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.generateClouds();
        this.draw();
        this.setWorld();
    }

    generateClouds(){
        let x = -400; 
    
        for (let i = 0; i < 1000; i++) {
            let randomDistance = 200 + Math.random() * 300; 
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

    setWorld() {
        this.character.world = this;            //blick ich 0 
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);



        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);        //causes displacement
            this.ctx.scale(-1, 1);                  // causes reflection of the image
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }

}