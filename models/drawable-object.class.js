/**
 * The DrawableObject class is the base class for all objects that can be drawn on the canvas.
 * It handles image loading and drawing.
 */
class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0; 
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    /**
     * Loads a single image from a given path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();   //this.img = document.getElementById('image')<img id="image" src="">
        this.img.src = path;
    }


    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draws a blue border around the object for debugging.
     * Only applies to specific game objects like Character and Enemies.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} array - List of image paths.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;    
            this.imageCache[path] = img;       
        });
    }
}