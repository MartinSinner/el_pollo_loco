/**
 * Creates many clouds with random distance between them.
 * 
 * @returns {Cloud[]} An array with cloud objects.
 */
function generateClouds() {
    let clouds = [];
    let x = -500;
    for (let i = 0; i < 1000; i++) {
        let randomDistance = 400 + Math.random() * 300;
        let imageNumber = (i % 2 === 0) ? 1 : 2;

        x += randomDistance;

        clouds.push(new Cloud(`img/5_background/layers/4_clouds/${imageNumber}.png`, x));
    }
    return clouds;
}


/**
 * Creates a long background by repeating air and ground layers.
 * 
 * @returns {BackgroundObject[]} An array with background images.
 */
function generateBackground() {
    let backgroundObjects = [];
    for (let i = 0; i < 1000; i++) {
        let offset = i * 719;
        let imageNumber = (i % 2 === 0) ? 1 : 2;

        backgroundObjects.push(
            new BackgroundObject('img/5_background/layers/air.png', offset),
            new BackgroundObject(`img/5_background/layers/3_third_layer/${imageNumber}.png`, offset),
            new BackgroundObject(`img/5_background/layers/2_second_layer/${imageNumber}.png`, offset),
            new BackgroundObject(`img/5_background/layers/1_first_layer/${imageNumber}.png`, offset),
        );
    }
    return backgroundObjects;
}




