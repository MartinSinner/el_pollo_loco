class Bossbar extends MovableObject {
    width = 250;
    height = 70;

    percentage = 100;

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/100.png'   
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 360;
        this.setPercentage(100);
        this.y = -12;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImage()]
        this.img = this.imageCache[path];
    }

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