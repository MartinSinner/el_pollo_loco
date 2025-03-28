/**
 * This class shows the salsa bar (throwable bottles).
 * It fills up when the player collects salsa bottles.
 * Inherits from MovableObject.
 */
class Salsabar extends MovableObject {
    width = 250;
    height = 70;
    collectedSalsa = 0;


    // Animation for statusbar
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];


    /**
     * Sets up the salsa bar at the top left of the screen.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 90;
    }


    /**
     * Updates the salsa bar based on collected salsa.
     * @param {number} collectedSalsa - The current collected salsa value.
     */
    setCollectedSalsa(collectedSalsa){
        this.collectedSalsa = collectedSalsa;
        let path = this.IMAGES[this.resolveImageSalsa()]
        this.img = this.imageCache[path];
    }


     /**
     * Returns the correct image index based on collected salsa.
     * @returns {number} Index of the image in IMAGES array.
     */
    resolveImageSalsa(){
        let index = Math.min(Math.floor(this.collectedSalsa / 20), this.IMAGES.length -1);
        return index;
    }
}