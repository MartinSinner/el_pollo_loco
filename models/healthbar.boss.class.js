class Bossbar extends MovableObject {
    width = 250;
    height = 70;

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/0.png'
    ]

    constructor(){
        super();
        this.loadImage('img/7_statusbars/2_statusbar_endboss/orange/100.png');
        this.loadImages(this.IMAGES);
        this.x = 360;
        this.y = -12;
    }
}