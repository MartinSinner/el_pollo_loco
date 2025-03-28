/**
 * This class creates a cloud image for the game.
 * It is placed in the world and can move like other objects.
 * Inherits from MovableObject class.
 */
class Cloud extends MovableObject {
    y = -10;
    width = 600;
    height = 400;


    /**
     * Creates clouds at a specific position.
     * 
     * @param {string} imgPath - The path to the cloud image.
     * @param {number} x - The x-coordinate of the cloud.
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath);

        this.x = x;
        this.animate();
    }


    /**
     * Starts moving the cloud slowly to the left.
     */
    animate() {
        this.moveLeft();
    }
}