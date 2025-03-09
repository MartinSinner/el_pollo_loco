class Cloud extends MovableObject {
    y = -10;
    width = 600;
    height = 400;

    constructor(imgPath, x) {
        super().loadImage(imgPath);

        this.x = x;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}