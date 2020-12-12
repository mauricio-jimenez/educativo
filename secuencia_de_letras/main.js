

var puntuacion = 0
var permutaciones = []
var escala = 0
var respuestaCorrecta = 0
var canvas

function inicializacion() {
	
	let ctx

	puntuacion = document.getElementById('puntuacion')
	canvas = document.getElementById('canvas')
	// eventlistener
	let botones = document.querySelectorAll("button")
	for (let i = 0; i < 6; i++) {	
		botones[i].addEventListener("click", evaluacion );
	}
}

function reset() {
	generaPermutaciones()
	respuestaCorrecta = Math.floor( Math.random() * 6 )
	dibujaBotones()
	dibujaPantalla()
}

function dibujaPantalla() {
	
	let correcta = permutaciones[ respuestaCorrecta ]
	let rotaciones = Math.floor( Math.random() * 4 )
	let mientras

	for (let i=0; i < rotaciones; i++) {
		mientras = correcta.pop()
		correcta.unshift( mientras )
	}

	canvas.innerHTML = correcta.join("").repeat(2)
}

function dibujaBotones() {
	
	// cada una de las permutaciones
	let botones = document.querySelectorAll("button");	
	for (let i = 0; i < 6; i++) {	
		botones[i].innerHTML  = permutaciones[i].join("") 
	}
}

function generaPermutaciones() {
	
	// serian (4-1)! = 3! = 6 permutaciones circulares 
	let opciones = [ ['a','x','c','o'], ['a','x','o','c'], ['a','c','o','x'], 
			['a','c','x','o'], ['a','o','x','c'], ['a','o','c','x'] ]
	let orden = shuffle( [0,1,2,3,4,5] )
	permutaciones = []

	for (let i=0; i<6; i++) {
		permutaciones.push( opciones[ orden[i] ] )
	}
}


function evaluacion(e) {
	
	let nuevaPuntuacion;

	respuesta = e.currentTarget.getAttribute("value")

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
	
	reset()
}


// foreign helpers ---------------------------------------------------------------------------

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
