let ball, p1, p2
let go = false;
let premuto=false
let i = 0
let k=0
let cont=0
let sottofondo=0


function preload () {
	//caricamento dei file immagini e suoni
	immagine_palla=loadImage("./immagini/al_rihla.png")
	messi=loadImage("./immagini/messi.png")
	mbappe=loadImage("./immagini/mbappe.png")
	start=loadImage("./immagini/inizio.jpg")
	font = loadFont("./Qatar2022Arabic-Heavy.ttf");
	tabellino=loadImage("./immagini/punteggio.png")
	coppa_mbappe=loadImage("./immagini/mbappe_coppa.jpg")
	campo=loadImage("./immagini/campo_2.jpg")
	coppa_messi=loadImage("./immagini/sfondo.webp")
	soundFormats('ogg', 'mp3');
	sound_messi = loadSound( "./suoni/messi.mp3" );  
	sound_mbappe = loadSound( "./suoni/pempe.mp3" ); 
	suono_schermata=loadSound( "./suoni/schermata.mp3" ); 
	suono_sottofondo=loadSound( "./suoni/sottofondo.mp3" );

}



function setup() {
	
	createCanvas(580, 380)
	

	ball = new Ball(width/2-15, height/2-15, 10);
	p1 = new Paddle1(20, height/2 - 50, 100, 100);
	p2 = new Paddle2(width - 130, height/2 - 50, 100, 100);
	
	
}

function erba() {
    fill(150, 210, 150);
    noStroke();
    rect(0, 0, 580, 380);
}

function linee(){
    stroke(255, 255, 255);  // bianco
    noFill();    

    // confini
    rect(0, 0, 580, 380);

    // linea centrocampo
    line(290, 0, 290, 380);

    // cerchio centrocampo
    ellipse(290, 190, 100, 100);


    // dischetto
    fill(255, 255, 255);
    ellipse(290, 190, 3, 3);
    noFill();
}

function riproduciSuonoSchermata(){
	if(cont==0){     //per far si che non si ripeta
		suono_schermata.play()
		cont++
	}
}

function riproduciSuonoSottofondo(){
	if(sottofondo==0){
		suono_sottofondo.play()
		sottofondo++
	}
}


function draw() {
	i = i + 10

	if(premuto==false){
		
		background(start)
		textFont(font);
    	textSize(30);
		textAlign(RIGHT,TOP);  
		stroke(255);
    	fill(135, 10, 54);
		riproduciSuonoSchermata()
		if (i % 20 === 0){
		text("Premi Y per iniziare il gioco\n",width/2 + 200, 20);
		frameRate(2)
		}
		if(keyIsDown(89)){      //premere più volte, probabilmente a causa del framerate non prende bene il segnale del tasto premuto
			frameRate(100)
			premuto=true
			suono_schermata.stop()
		}
	}else if (premuto==true){
	frameRate(100)
	riproduciSuonoSottofondo()
	
	while(k<1){    //alert appare solo unna volta
		alert('-> Usa A,Z e K,M per muovere i giocatori\n'+
		  '-> Premi la BARRA SPAZIATRICE per iniziare un round, e R per riniziare il gioco\n');
		  k++
		}
	
		
	//erba()       diesegno "manuale" di un campo 
	//linee()
	background(campo);     //immgine di un campo
	stampaPunti()
	muoviPaddles();
	p1.visualizza();
	p2.visualizza();
	

	let goal = ball.outOfBounds();
	if (goal) {
		go = false;  //la palla viene fermata e ritorna sul dischetto
		if (goal == 'destra') {
			suono_sottofondo.setVolume(0.2)    //se qualcuno fa goal, la musica di sottofondo diventa più bassa
			p1.punteggio++;
			sound_messi.play()
			
		} else {
			suono_sottofondo.setVolume(0.2)
			p2.punteggio++
			sound_mbappe.setVolume(2)
			sound_mbappe.play()
		}
	}

	//se uno dei personaggi arriva a 5
	if(p1.punteggio==5){
		background(coppa_messi);
		textFont(font);
    	textSize(30);
		textAlign(RIGHT,TOP);  
		stroke(255);
    	fill(135, 10, 54);
		text("ARGENTINA WINS\n",width/2 + 200, 20);
		noloop()
	}else if(p2.punteggio==5){
		background(coppa_mbappe);
		textFont(font);
    	textSize(30);
		textAlign(RIGHT,TOP);  
		stroke(255);
    	fill(135, 10, 54);
		text("FRANCE WINS\n",width/2 + 200, 20);
		noloop()
	}

	if (go){
		suono_sottofondo.setVolume(1)   //il volume torna normale
		ball.update(); //se la palla è in movimento, viene aggiornata la posizione con la funzione update
	} 

	ball.hit(p1, p2);  //palla  colpita
	
	ball.visualizza()
	
	
	}
}

function stampaPunti(){
	image(tabellino,35, 10,this.w, this.h);
	textFont(font);
    textSize(30);
    noStroke();
    fill(234,221,230);
	
    textAlign(RIGHT,TOP);  //scrittura dei punteggi
    text(p1.punteggio, width/2 - 35, 20);
    text(p2.punteggio, width/2 + 55, 20);
}


function muoviPaddles() {   //movimenti paddles
	// 65 = 'a'   paddle sinistra
	if (keyIsDown(65)) {
		p1.muovi(-10);
	}
	
	// 90 = 'z'
	if (keyIsDown(90)) {
		p1.muovi(10);
	}
	
	// 75 = 'k'   paddle destra
	if (keyIsDown(75)) {
		p2.muovi(-10);
	}
	
	// 77 = 'm'
	if (keyIsDown(77)) {
		p2.muovi(10);
	}
}

function keyTyped() {
	if (key == ' ') {   //la palla parte 
		go = true;
	}

	if (key == 'r'||key == 'R') {   //reset
		premuto=false;
		p1.punteggio = 0;
		p2.punteggio = 0;
		ball.resetball();
		go = false;
		k=0
		
	}


	return false;
}