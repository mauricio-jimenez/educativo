
const colores = ['nocolor', '#6a6', '#a66', '#66a']
const formas = ['noforma', circulo, triangulo, cuadrado]

var puntuacion = 0
var canvasContext
var laminas = []
var els = []
var escala = 0
var respuestaCorrecta = 0

function inicializacion() {
	
	let ctx

	puntuacion = document.getElementById('puntuacion')
	canvasContext = document.getElementById('canvas').getContext('2d')

	laminasCanvases = document.querySelectorAll('.lamina')
	laminasCanvases.forEach( function(c) {
		c.addEventListener("click", evaluacion)
		ctx = c.getContext('2d')
		laminas.push( ctx ) 
	})
}

function reset() {
	generaPermutaciones()
	respuestaCorrecta = Math.floor( Math.random() * 6 )
	dibujaPantalla()
}

function dibujaPantalla() {
	
	let r = els[1]

	for (let i=0; i<6; i++){

		formas[els[0][0]](laminas[i], colores[els[0][1]], els[0][2])
	}

	formas[els[1][0]](laminas[respuestaCorrecta], colores[els[1][1]], els[1][2])
}


function generaPermutaciones() {
	
	let opciones = [[1, 1, 1], [1, 1, 2], [1, 2, 1], [1, 2, 2], [1, 3, 1], [1, 3, 2], [2, 1, 1], [2, 1, 2], [2, 2, 1], [2, 2, 2], [2, 3, 1], [2, 3, 2], [3, 1, 1], [3, 1, 2], [3, 2, 1], [3, 2, 2], [3, 3, 1], [3, 3, 2]]

	let orden = shuffle( [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17] )

	els = []

	for (let i=0; i<6; i++) {
		els.push( opciones[ orden[i] ] )
	}
}


function evaluacion(e) {
	
	let nuevaPuntuacion;

	respuesta = e.currentTarget.getAttribute("value") - 1

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

function circulo(ctx, color, tamaño) {
	
	//tamaño puede ser 1, 2 ó 3
	
	let ini = 50
	let radio = 15 * tamaño
	
	ctx.clearRect(0,0,100,100)
	ctx.fillStyle = color
	ctx.beginPath()
	ctx.arc(ini, ini, radio, 0, Math.PI * 2)
	ctx.fill()
}

function cuadrado(ctx, color, tamaño) {
	
	let ancla = 50
	let ini = ancla - 15 * tamaño
	let desp = 30 * tamaño

	ctx.clearRect(0,0,100,100)
	ctx.fillStyle = color
	ctx.fillRect(ini, ini, desp, desp) 
}

function triangulo(ctx, color, tamaño) {
	
	let centro = 50
	let cerca = centro - 17 * tamaño
	let lejos = centro + 17 * tamaño

	ctx.clearRect(0,0,100,100)
	ctx.fillStyle = color
	ctx.beginPath()
	ctx.moveTo(cerca, lejos - 5)
	ctx.lineTo(centro, cerca + 5)
	ctx.lineTo(lejos, lejos - 5)
	ctx.closePath()
	ctx.fill()
}

inicializacion()
reset()
