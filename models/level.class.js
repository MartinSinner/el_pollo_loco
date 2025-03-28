/**
 * This class defines everything inside one game level.
 * It includes enemies, clouds, background, salsa bottles, and coins.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    salsa;
    coin;
    level_end_x = 5000;
    
    
    /**
     * Creates a new level with all game objects.
     * 
     * @param {Array} enemies - List of all enemies in the level.
     * @param {Array} clouds - List of clouds in the background.
     * @param {Array} backgroundObjects - All background images.
     * @param {Array} salsa - Salsa bottles to collect.
     * @param {Array} coin - Coins to collect.
     */
    constructor(enemies, clouds, backgroundObjects, salsa, coin) {
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.salsa = salsa;
        this.coin = coin;
    }
}