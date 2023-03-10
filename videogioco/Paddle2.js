class Paddle2 {

    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.punteggio = 0;
    }

    muovi(movimento) {
        this.pos.y += movimento;
        this.pos.y = constrain(this.pos.y, 10, height - 10 - this.h);
    }

    visualizza() {
        image(mbappe,this.pos.x, this.pos.y,this.w, this.h)
    }
        

}