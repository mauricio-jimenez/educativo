var puntuacion;
var ctx;
var escala;
const colores = ["orange", "blue"]
var largoBarras = [];
var respuestaCorrecta;

function inicializacion() {
    
	// TODO reorientacion
	
	let canvas;
	let comparadores;

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
	
	comparadores = [">", "=", "<"];

	let botones = document.querySelectorAll("button");	
	for (i = 0; i < 3; i++) {
		// valores
		botones[i].innerHTML = comparadores[i];
		// eventlistener
		botones[i].addEventListener("click", evaluacion );
	}
}

function draw() {
     
	let margenX = 15 ;
	let espaciado = 50 ;
	let thickness = 20 ;
	let paso = 30 ;
	let x;
	let y;
	let dx;
	let dy;

	ctx.clearRect(0,0, 100 * escala, 100 * escala);

	for (i = 0; i < 2; i++){
		
		x = (margenX + i * espaciado) * escala ;
		y = 100 * escala;
		dx = thickness * escala ;
		dy = largoBarras[i] * paso * -1 * escala ; 

		ctx.fillStyle = colores[i];
		ctx.fillRect( x, y, dx, dy);
    }
}

function reset() {
	
	let maximo = 4;
	let minimo = 1;

	for (i = 0; i < 2; i++) {
		largoBarras[i] = Math.floor( Math.random() * (maximo - minimo) )  + minimo;
	}

	if ( largoBarras[0] > largoBarras[1] ) 
	{
		respuestaCorrecta = "&gt;";
	}
	else if ( largoBarras[0] == largoBarras[1] ) 
	{	
		respuestaCorrecta = "=";
	}
	else 
	{
		respuestaCorrecta = "&lt;";
	}
}

function evaluacion(e) {
	
	let nuevaPuntuacion;

	respuesta = e.currentTarget.innerHTML;		

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
	
inicializacion()
reset()
draw()

