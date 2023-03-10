class Ball {

    constructor(x, y, r) {
        this.spawn = createVector(x, y)
        this.velocita = 10;
        this.r = r;
        this.resetball();
        this.modificaVelocita()
    }

    modificaVelocita(){
        this.velocita=this.velocita+1
    }
    
    
    resetball() {
        this.pos = this.spawn.copy();
        this.velocita=10
        let direzione = 0
        this.vel = p5.Vector.fromAngle(direzione, 10);
        if (random(1) > 0.5) this.vel.x *= -1;
    }

    outOfBounds() {
    
        // se la palla va fuori dallo schermo, assegna il gol
        
        if (this.pos.x > width + this.r)  {
            this.resetball();
            return 'destra';
        }
        
        if (this.pos.x < -this.r) {
            this.resetball();
            return 'sinistra';
        }
        
        return false;
    
    }

   
    hit(p1, p2) {
        for (let pad of [p1, p2]) {
            let padX  = pad.pos.x;
            let padY  = pad.pos.y;
            let ballX = this.pos.x;
            let ballY = this.pos.y;
            let r = this.r

            //collisione asse x pad
            if ((padX) < (ballX+r) && (ballX) < (padX + pad.w + r)) {
                //collisione asse y pad
                if ((padY) < ballY+r && ballY < (padY + pad.h + r)) {
                    //collisione
                    let padCenter = createVector(pad.pos.x + pad.w/2, pad.pos.y + pad.h/2)

                    // vettore dal centro del pad al centro della palla
                    this.vel = this.pos.copy().sub(padCenter);

                    // calcolo angolo verso il centro dell'altro pad
                    let a = this.vel.heading();
                    if (a > -PI/2 && a < PI/2) {
                        this.modificaVelocita()      //velocità palla aumenta a ogni hit col pad
                        this.vel = p5.Vector.fromAngle(a/2, this.velocita);
                    } else {
                        this.vel.rotate(PI);
                        let a = this.vel.heading();
                        this.modificaVelocita()     //velocità palla aumenta a ogni hit col pad
                        this.vel = p5.Vector.fromAngle(PI + a/2, this.velocita);
                    }

                }
            }
        }
    }
    
    update() {
        this.pos.add(this.vel);
        // rimbalza sotto e sopra contro i muri
        if (this.pos.y + this.r >= height || this.pos.y - this.r <= 0) {
            this.pos.y = constrain(this.pos.y, this.r, height - this.r);
            this.vel.y *= -1;
        }
        
    }

    visualizza() {
        image(immagine_palla,this.pos.x, this.pos.y);
    }
}