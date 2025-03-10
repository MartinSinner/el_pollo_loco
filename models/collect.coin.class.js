class Coin extends MovableObject {
    width = 130;
    height = 130;
    y = 220;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super();

        let coinImg = this.IMAGES_COIN[Math.floor(Math.random() * this.IMAGES_COIN.length)];
        this.loadImage(coinImg);

        this.x = 400 + Math.random() * 4000;
        this.y = 180 + Math.random() * 60;

    }
}