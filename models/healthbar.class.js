class Healthbar extends MovableObject {
    width = 250;
    height = 70;

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    constructor(){
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png');
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = -15;
    }
}