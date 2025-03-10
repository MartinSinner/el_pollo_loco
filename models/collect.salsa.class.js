class Salsa extends MovableObject {
    width = 100;
    height = 100;
    y = 340;

    IMAGES_SALSA = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor(){
        super();

        let randomSalsaImg = this.IMAGES_SALSA[Math.floor(Math.random()* this.IMAGES_SALSA.length)];
        this.loadImage(randomSalsaImg);
        

        this.x = 250 + Math.random() * 3500;
    }

    
}