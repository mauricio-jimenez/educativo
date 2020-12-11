var puntuacion;
var ctx;
var escala;
const colores = ["red", "green", "blue"]; 
var largoBarras = [2,4,6];
var respuestaCorrecta;

function inicializacion() {
    
	// TODO reorientacion
	
	let canvas;

	puntuacion = document.getElementById('puntuacion');
	escala = Math.min( window.innerWidth, window.innerHeight) / 100;
	canvas = document.getElementById('canvas');
	canvas.width = escala * 100; 
	canvas.height = escala * 100;

	if (!canvas.getContext) {
		console.log("no hay contexto");
		return 
	}

	ctx = canvas.getContext('2d');
	
	//  botones	
	let botones = document.querySelectorAll("button");	
	for (i = 0; i < 3; i++) {
		// colores
		botones[i].style.backgroundColor = colores[i] 
		// eventlistener
		botones[i].addEventListener("click", evaluacion );
	}
}

function draw() {
     
	let margenX = 25 ;
	let espaciado = 20 ;
	let thickness = 10 ;
	let paso = 16 ;
	let x;
	let y;
	let dx;
	let dy;

	ctx.clearRect(0,0, 100 * escala, 100 * escala);

	for (i = 0; i < 3; i++){
		
		x = (margenX + i * espaciado) * escala ;
		y = 100 * escala;
		dx = thickness * escala ;
		dy = largoBarras[i] * paso * -1 * escala ; 

		ctx.fillStyle = colores[i];
		ctx.fillRect( x, y, dx, dy);
    }
}

function reset() {
	
	largoBarras = shuffle(largoBarras);
	respuestaCorrecta = colores[largoBarras.indexOf(4)]
}

function evaluacion(e) {
	
	let nuevaPuntuacion;

	respuesta = e.currentTarget.style.backgroundColor;		

	if (respuesta == respuestaCorrecta) {		
		
		nuevaPuntuacion = parseInt(puntuacion.innerHTML) + 1;
		puntuacion.innerHTML = nuevaPuntuacion; 		

		if ( nuevaPuntuacion == 7) {

			document.getElementById("mensaje").innerHTML = "Muy bien! Lo lograste!";
			document.getElementById("fanfare").play();
			return
		}
	
		document.getElementById("buena").play();

	}
	else {
		// quizas poner un sonido...
		nuevaPuntuacion = parseInt(puntuacion.innerHTML) - 1;
		if (nuevaPuntuacion >= 0) {
			puntuacion.innerHTML = nuevaPuntuacion; 		
		}
	}
	
	reset();
	draw()
}

var shuffle = function (array) {
	// helper
	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
	
inicializacion()
reset()
draw()

