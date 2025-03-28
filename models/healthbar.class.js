/**
 * Class for showing Pepe's health bar at the top left of the screen.
 * The bar changes image based on how much health Pepe has.
 * Inherits from MovableObject.
 */
class Healthbar extends MovableObject {
    width = 250;
    height = 70;


    /**
     * Images for different health levels (0% to 100%).
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;


    /**
     * Creates the health bar and places it on the screen.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 20;
        this.y = -15;
    }


    /**
     * Updates the health bar image based on the new percentage.
     * 
     * @param {number} percentage - New health value (0–100).
     */
    setPercentage(percentage) {
        this.percentage = Math.max(0, Math.min(100, Math.round(percentage)));
        let path = this.IMAGES[this.resolveImage()];
        this.img = this.imageCache[path];
    }
    
   
    /**
     * Returns the image index depending on how much health is left.
     * 
     * @returns {number} Index for the correct image.
     */
    resolveImage() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }
}