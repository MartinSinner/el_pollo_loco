class Salsabar extends MovableObject {
    width = 250;
    height = 70;
    collectedSalsa = 0;
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 90;
    }

    setCollectedSalsa(collectedSalsa){
        this.collectedSalsa = collectedSalsa;
        let path = this.IMAGES[this.resolveImageSalsa()]
        this.img = this.imageCache[path];
    }

    resolveImageSalsa(){
        let index = Math.min(Math.floor(this.collectedSalsa / 20), this.IMAGES.length -1);
        return index;
    }
}