class Level {
    enemies;
    clouds;
    backgroundObjects;
    salsa;
    coin;
    level_end_x = 5000;
    
    
    
    constructor(enemies, clouds, backgroundObjects, salsa, coin) {
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.salsa = salsa;
        this.coin = coin;
    }

   
}