class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;


    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x - 500;
        this.y = 480 - this.height;


    }
}