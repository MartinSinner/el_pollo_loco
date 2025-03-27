class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    constructor() {
        this.keyEvents();
        this.touchEvents();
    }

    keyEvents() {
        window.addEventListener('keydown', (event) => this.keyDown(event));
        window.addEventListener('keyup', (event) => this.keyUp(event));
    }

    keyDown(event) {
        console.log('Key pressed:', event.keyCode);

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

    touchEvents() {
        this.touchButtonEvent('buttonLeft', 'LEFT');
        this.touchButtonEvent('buttonRight', 'RIGHT');
        this.touchButtonEvent('buttonUp', 'SPACE');
        this.touchButtonEvent('buttonThrow', 'D');
    }

    touchButtonEvent(buttonId, direction) {
        const button = document.getElementById(buttonId);
        button.addEventListener('touchstart', (event) => this.handleTouchStart(event, direction));
        button.addEventListener('touchend', (event) => this.handleTouchEnd(event, direction));
    }

    handleTouchStart(event, direction){
        event.preventDefault();
        this[direction] = true;
    }

    handleTouchEnd(event, direction){
        event.preventDefault();
        this[direction] = false;
    }
}

