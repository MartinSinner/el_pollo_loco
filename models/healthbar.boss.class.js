/**
 * Class for displaying the Endboss health bar in the top center of the screen.
 * Shows different images based on how much health the boss has.
 * Inherits from MovableObject.
 */
class Bossbar extends MovableObject {
    width = 250;
    height = 70;
    percentage = 100;
    isVisible = false;


    /**
     * Images for different health levels of the boss (0% to 100%).
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/100.png'   
    ];


    /**
     * Creates the bossbar and sets its starting position and image.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 320;
        this.setPercentage(100);
        this.y = -15;
    }


    /**
     * Updates the bossbar image depending on the health percentage.
     * 
     * @param {number} percentage - New health percentage of the boss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImage()]
        this.img = this.imageCache[path];
    }


    /**
     * Returns the correct index for the health bar image based on percentage.
     * 
     * @returns {number} Index of the image to use.
     */
    resolveImage() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}