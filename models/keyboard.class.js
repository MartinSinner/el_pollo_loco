/**
 * This class handles keyboard and touch inputs.
 * It listens to keys and buttons for moving Pepe or throwing bottles.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    /**
     * Sets up all keyboard and touch events.
     */
    constructor() {
        this.keyEvents();
        this.touchEvents();
    }


    /**
     * Adds event listeners for key presses.
     */
    keyEvents() {
        window.addEventListener('keydown', (event) => this.keyDown(event));
        window.addEventListener('keyup', (event) => this.keyUp(event));
    }


     /**
     * Sets direction to true when key is pressed down.
     * @param {KeyboardEvent} event - The keydown event.
     */
    keyDown(event) {
        if (event.keyCode === 39) {
            this.RIGHT = true;
        }

        if (event.keyCode === 37) {
            this.LEFT = true;
        }

        if (event.keyCode === 38) {
            keyboard.UP = true;
        }

        if (event.keyCode === 40) {
            keyboard.DOWN = true;
        }

        if (event.keyCode === 32) {
            this.SPACE = true;
        }

        if (event.keyCode === 68) {
            this.D = true;
        }
    }


    /**
     * Sets direction to false when key is released.
     * @param {KeyboardEvent} event - The keyup event.
     */
    keyUp(event) {
        if (event.keyCode === 39) {
            this.RIGHT = false;
        }

        if (event.keyCode === 37) {
            this.LEFT = false;
        }

        if (event.keyCode === 38) {
            this.UP = false;
        }

        if (event.keyCode === 40) {
            this.DOWN = false;
        }

        if (event.keyCode === 32) {
            this.SPACE = false;
        }

        if (event.keyCode === 68) {
            this.D = false;
        }
    }


    /**
     * Adds touch events for mobile control buttons.
     */
    touchEvents() {
        this.touchButtonEvent('buttonLeft', 'LEFT');
        this.touchButtonEvent('buttonRight', 'RIGHT');
        this.touchButtonEvent('buttonUp', 'SPACE');
        this.touchButtonEvent('buttonThrow', 'D');
    }


    /**
     * Binds touchstart and touchend to a specific button and action.
     * @param {string} buttonId - The ID of the touch button.
     * @param {string} direction - The name of the direction key ('LEFT', 'D' etc.).
     */
    touchButtonEvent(buttonId, direction) {
        const button = document.getElementById(buttonId);
        button.addEventListener('touchstart', (event) => this.handleTouchStart(event, direction));
        button.addEventListener('touchend', (event) => this.handleTouchEnd(event, direction));
    }


    /**
     * Sets the direction to true when touching the button.
     * @param {TouchEvent} event - The touchstart event.
     * @param {string} direction - The direction to activate.
     */
    handleTouchStart(event, direction){
        event.preventDefault();
        this[direction] = true;
    }


     /**
     * Sets the direction to false when releasing the button.
     * @param {TouchEvent} event - The touchend event.
     * @param {string} direction - The direction to deactivate.
     */
    handleTouchEnd(event, direction){
        event.preventDefault();
        this[direction] = false;
    }
}

