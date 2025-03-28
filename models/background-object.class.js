/**
 * This class creates a background image for the game.
 * It is placed in the world and can move like other objects.
 * Inherits from MovableObject class.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

/**
     * Creates a background image at a specific position.
     * 
     * @param {string} imgPath - The path to the background image.
     * @param {number} x - The x-coordinate of the background.
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x - 500;
        this.y = 480 - this.height;
    }
}