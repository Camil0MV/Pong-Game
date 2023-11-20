class Ball {
    #radius;
    #xCenter;
    #yCenter;
    #fillColor;
    #vx;
    #vy;

    constructor(initialRadius, initialX, initialY, fillColor) {
        this.#radius = initialRadius;
        this.#xCenter = initialX;
        this.#yCenter = initialY;
        this.#fillColor = fillColor;
        this.#vx = 6;
        this.#vy = 6;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.#xCenter,this.#yCenter,this.#radius, 0, 2.0 * Math.PI);
        ctx.fillStyle = this.#fillColor;
        ctx.fill();
        ctx.closePath();
    }

    move () {
        this.#xCenter += this.#vx;
        this.#yCenter += this.#vy;
    }

    bounceOnePlayerMode(canvas, playerPad1, computerPad) {
        if (this.#yCenter - this.#radius <= 0 || this.#yCenter + this.#radius >= canvas.height) {
            this.#vy *= -1;
        }

        if (
            this.#xCenter + this.#radius >= playerPad1.x &&
            this.#yCenter + this.#radius >= playerPad1.y &&
            this.#yCenter + this.#radius <= playerPad1.y + playerPad1.height
        ) {
            this.#vx = -Math.abs(this.#vx);
        }

        if (
            this.#xCenter - this.#radius <= computerPad.x + computerPad.width &&
            this.#yCenter + this.#radius >= computerPad.y &&
            this.#yCenter + this.#radius <= computerPad.y + computerPad.height
        ) {
            this.#vx = Math.abs(this.#vx);
        }
    }

    bounceTwoPlayersMode(canvas, playerPad1, playerPad2) {
        if (this.#yCenter - this.#radius <= 0 || this.#yCenter + this.#radius >= canvas.height) {
            this.#vy *= -1;
        }

        if (
            this.#xCenter + this.#radius >= playerPad1.x &&
            this.#yCenter + this.#radius >= playerPad1.y &&
            this.#yCenter + this.#radius <= playerPad1.y + playerPad1.height
        ) {
            this.#vx = -Math.abs(this.#vx);
        }

        if (
            this.#xCenter - this.#radius <= playerPad2.x + playerPad2.width &&
            this.#yCenter + this.#radius >= playerPad2.y &&
            this.#yCenter + this.#radius <= playerPad2.y + playerPad2.height
        ) {
            this.#vx = Math.abs(this.#vx);
        }
    }

    get xCenter () {
        return this.#xCenter;
    }

    set xCenter (value) {
        this.#xCenter = value;
    }

    get yCenter () {
        return this.#yCenter;
    }

    set yCenter (value) {
        this.#yCenter = value;
    }

    get vx () {
        return this.#vx;
    }

    set vx (value) {
        this.#vx = value;
    }

    get vy () {
        return this.#vy;
    }

    set vy (value) {
        this.#vy = value;
    }

    get radius () {
        return this.#radius;
    }

    set radius (value) {
        this.#radius = value;
    }

    reset () {
        this.#xCenter = 350.5;
        this.#yCenter = 223.5;
    }
}

class PlayerPad {
    #x;
    #y;
    #width;
    #height;
    #fillColor;
    #vy;

    constructor(x, y, width, height, fillColor) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#fillColor = fillColor;
        this.#vy = 27;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.rect(this.#x, this.#y, this.#width, this.#height);
        ctx.fillStyle = this.#fillColor;
        ctx.fill();
        ctx.closePath();
    }

    get x () {
        return this.#x;
    }

    set x (value) {
        this.#x = value;
    }

    get y () {
        return this.#y;
    }

    set y (value) {
        this.#y = value;
    }

    get width () {
        return this.#width;
    }

    set width (value) {
        this.#width = value;
    }

    get height () {
        return this.#height;
    }

    set height (value) {
        this.#height = value;
    }

    get vy () {
        return this.#vy;
    }

    set vy (value) {
        this.#vy = value;
    }
}

class ComputerPad {
    #x;
    #y;
    #width;
    #height;
    #fillColor;
    #vy;

    constructor(x, y, width, height, fillColor) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#fillColor = fillColor;
        this.#vy = 5.3;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.rect(this.#x, this.#y, this.#width, this.#height);
        ctx.fillStyle = this.#fillColor;
        ctx.fill();
        ctx.closePath();
    }

    updateComputerPad (ball, canvas) {
        const sensitivity = 0.2;
        const randomFactor = (Math.random() - 0.4) * sensitivity;

        if (ball.yCenter < this.#y + this.#height / 2) {
            this.#vy = -Math.abs(this.#vy) + randomFactor;
        } else if (ball.yCenter > this.#y + this.#height / 2) {
            this.#vy = Math.abs(this.#vy) + randomFactor;
        } else {
            this.#vy = 0;
        }
        
        this.#y += this.#vy;
        
        this.#y = Math.max(0, Math.min(canvas.height - this.#vy, this.#y));
    }

    get x () {
        return this.#x;
    }

    set x (value) {
        this.#x = value;
    }

    get y () {
        return this.#y;
    }

    set y (value) {
        this.#y = value;
    }

    get width () {
        return this.#width;
    }

    set width (value) {
        this.#width = value;
    }

    get height () {
        return this.#height;
    }

    set height (value) {
        this.#height = value;
    }

    get vy () {
        return this.#vy;
    }

    set vy (value) {
        this.#vy = value;
    }
}