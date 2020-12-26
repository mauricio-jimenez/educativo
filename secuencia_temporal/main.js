
const colores = ["black", "#6a6", "#a66", "#66a"] 

var puntuacion = 0
var canvasContext
var cicloAnimacion
var estadoAnimacion = 0
var buttonContexts = []
var permutaciones = []
var escala = 0
var respuestaCorrecta = 0
var timer

function inicializacion() {
	
	let ctx

	puntuacion = document.getElementById('puntuacion')
	canvasContext = document.getElementById('canvas').getContext('2d')

	let canvases = document.querySelectorAll('.boton')
	canvases.forEach( function(c) {
		c.addEventListener("click", evaluacion)
		c.width = 60
		c.height = 20
		ctx = c.getContext('2d')
		buttonContexts.push( ctx ) 
	})

	//escala = Math.min( window.innerWidth, window.innerHeight) / 100;
}

function reset() {
	generaPermutaciones()
	respuestaCorrecta = Math.floor( Math.random() * 6 )
	cicloAnimacion = permutaciones [ respuestaCorrecta ]
	dibujaBotones()
	dibujaPantalla()
}

function dibujaPantalla() {

	if (estadoAnimacion == 3) {

		canvasContext.fillStyle = "black"
		timer = setTimeout(cambiaEstado, 2500)
	}
	else {
		canvasContext.fillStyle = colores[ cicloAnimacion [estadoAnimacion] ]

		canvasContext.beginPath()
		canvasContext.arc(20 + 30*estadoAnimacion,50,20,0, Math.PI * 2)
		canvasContext.fill()

		timer = setTimeout(cambiaEstado, 2500)
	}
}

function cambiaEstado() {

	clearTimeout(timer)
	canvasContext.clearRect(0,0,100,100)
	
	if ( estadoAnimacion == 3 ) {
		estadoAnimacion = 0
	}
	else {
		estadoAnimacion += 1
	}

	dibujaPantalla()
}


function dibujaBotones() {
	
	for (let i=0; i<6; i++) {
		buttonContexts[i].clearRect(0,0,60,20)
		for (let j=0; j<3; j++) {
			
			buttonContexts[i].fillStyle = colores[ permutaciones[i][j] ]
			//buttonContexts[i].fillRect(j*20, 0, 20, 20)

			buttonContexts[i].beginPath()
			buttonContexts[i].arc(10 + 20*j, 10, 10, 0, Math.PI * 2)
			buttonContexts[i].fill()
		}
	}		
}

function generaPermutaciones() {
	
	let opciones = [ [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] ] 
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
