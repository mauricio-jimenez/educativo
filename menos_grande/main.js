var puntuacion;
var ctx;
var escala;
const colores = ["red", "blue", "yellow", "green", "purple", "grey"]; 
const largoBarras = [1,2,3,4,5,6];
var cableadoColores = [1,2,3,4,5,6];
var pregunta = [1,2,3,4,5,6];
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
	
	// eventlistener
	document.getElementById("boton1").addEventListener("click", evaluacion );
	document.getElementById("boton2").addEventListener("click", evaluacion );
}

function draw() {
     
	let margenX = 25 ;
	let espaciado = 35 ;
	let thickness = 15 ;
	let paso = 16 ;
	let x;
	let y;
	let dx;
	let dy;

	ctx.clearRect(0,0, 100 * escala, 100 * escala);

	for (i = 0; i < 2; i++){
		
		x = (margenX + i * espaciado) * escala 
		y = 100 * escala
		dx = thickness * escala 
		dy = largoBarras[ pregunta[i] - 1 ] * paso * -1 * escala  

		ctx.fillStyle = colores[ cableadoColores[ pregunta[i] - 1] - 1 ]
		ctx.fillRect( x, y, dx, dy);
    }
}

function reset() {
	
	let boton1
	let boton2
	
	shuffle(pregunta)
	shuffle(cableadoColores)

	// arbitrariamente usando indices 0 y 1
	boton1 = document.getElementById("boton1")
	boton1.style.backgroundColor = colores[ cableadoColores[ pregunta[0] - 1] - 1 ]
	boton1.setAttribute('value', pregunta[0])

	boton2 = document.getElementById("boton2")
	boton2.style.backgroundColor = colores[ cableadoColores[ pregunta[1] - 1] - 1 ]
	boton2.setAttribute('value', pregunta[1])

	respuestaCorrecta = Math.min( pregunta[0], pregunta[1] )
}

function evaluacion(e) {
	
	let nuevaPuntuacion;

	respuesta = e.currentTarget.getAttribute('value')

	if (respuesta == respuestaCorrecta) {		
		
		nuevaPuntuacion = parseInt(puntuacion.innerHTML) + 1;
		puntuacion.innerHTML = nuevaPuntuacion; 		

		if ( nuevaPuntuacion == 20) {

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

