/**
 * This class creates a single coin object in the world.
 * The coin appears at a random x and y position.
 * Inherits from the MovableObject class.
 */
class Coin extends MovableObject {
    width = 130;
    height = 130;
    y = 220;


    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    
    /**
     * Creates a coin with a random image and random position.
     */
    constructor() {
        super();

        let coinImg = this.IMAGES_COIN[Math.floor(Math.random() * this.IMAGES_COIN.length)];
        this.loadImage(coinImg);

        this.x = 400 + Math.random() * 4000;
        this.y = 180 + Math.random() * 60;
    }   
}