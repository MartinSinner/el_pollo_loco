/**
 * This class creates the coin status bar at the top left of the screen.
 * It shows how many coins the player has collected.
 * Inherits from the MovableObject class.
 */
class Coinbar extends MovableObject {
    width = 250;
    height = 70;
    collectedCoins = 0;
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    
    /**
     * Creates the coin bar and loads the images.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 35;
    }


    /**
     * Updates the coin bar based on how many coins were collected.
     * 
     * @param {number} collectedCoins - The amount of collected coins.
     */
    setCollectedCoins(collectedCoins) {
        this.collectedCoins = collectedCoins;
        let path = this.IMAGES[this.resolveImageCoinbar()]
        this.img = this.imageCache[path];
    }


     /**
     * Chooses the correct image based on how many coins were collected.
     * 
     * @returns {number} Index of the image to display.
     */
    resolveImageCoinbar() {
        let index = Math.min(Math.floor(this.collectedCoins / 20), this.IMAGES.length - 1);
        return index; 
    }   
}