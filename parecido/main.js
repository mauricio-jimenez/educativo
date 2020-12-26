
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
	generaElementos()
	respuestaCorrecta = Math.floor( Math.random() * 2 )
	dibujaPantalla()
}

function dibujaPantalla() {

	let dim_compartida

	dim_compartida = Math.floor( Math.random() * 2 )

	// transferemcia de atributo compartido
	els[2][dim_compartida] = els[respuestaCorrecta][dim_compartida] 
	
	formas[els[2][0]](canvasContext, colores[els[2][1]])
	
	for (let i=0; i<2; i++){

		formas[els[i][0]](laminas[i], colores[els[i][1]])
	}
}


function generaElementos() {
	
	let a = shuffle([1,2,3])
	let b = shuffle([1,2,3])

	els = []

	for (let i=0; i<3; i++){
		els.push([a.pop(), b.pop()])
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

function circulo(ctx, color, tamaño=2) {
	
	//tamaño puede ser 1, 2 ó 3
	
	let ini = 50
	let radio = 15 * tamaño
	
	ctx.clearRect(0,0,100,100)
	ctx.fillStyle = color
	ctx.beginPath()
	ctx.arc(ini, ini, radio, 0, Math.PI * 2)
	ctx.fill()
}

function cuadrado(ctx, color, tamaño=2) {
	
	let ancla = 50
	let ini = ancla - 15 * tamaño
	let desp = 30 * tamaño

	ctx.clearRect(0,0,100,100)
	ctx.fillStyle = color
	ctx.fillRect(ini, ini, desp, desp) 
}

function triangulo(ctx, color, tamaño=2) {
	
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
