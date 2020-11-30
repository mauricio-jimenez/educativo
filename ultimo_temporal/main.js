
const colores = ["black", "#500", "#050", "#005"]
const traduccionColores = ["negro", "rojo", "verde", "azul"]

var puntuacion = 0
var canvasContext
var cicloAnimacion
var estadoAnimacion = 0
var buttonContexts = []
var respuestaCorrecta = 0
var cableadoBotones = []
var timer

function inicializacion() {
	
	let ctx

	puntuacion = document.getElementById('puntuacion')
	canvasContext = document.getElementById('canvas').getContext('2d')

	let canvases = document.querySelectorAll('.sboton')
	canvases.forEach( function(c) {
		c.addEventListener("click", evaluacion)
		c.width = 60
		c.height = 60
		ctx = c.getContext('2d')
		buttonContexts.push( ctx ) 
	})

	//escala = Math.min( window.innerWidth, window.innerHeight) / 100;
}

function reset() {

	cicloAnimacion = shuffle([1,2,3])
	respuestaCorrecta = cicloAnimacion[2]
	cableadoBotones = shuffle([1,2,3]) 
	dibujaBotones()
	dibujaPantalla()
	actualizaMensaje()
}

function actualizaMensaje() {
	let mensaje = document.getElementById("mensaje")
	let texto = traduccionColores[ cicloAnimacion [ pregunta ]]
	mensaje.innerHTML = "¿Qué color aparece despues que el " + texto + "?"
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
	
	for (let i=0; i<3; i++) {
		buttonContexts[i].clearRect(0,0,60,20)
		
		// sera la inversa?
		buttonContexts[i].fillStyle = colores[ cableadoBotones[i] ]

		buttonContexts[i].beginPath()
		buttonContexts[i].arc(30, 30, 30, 0, Math.PI * 2)
		buttonContexts[i].fill()
	}		
}


function evaluacion(e) {
	
	let nuevaPuntuacion;

	irespuesta = e.currentTarget.getAttribute("value")
	respuesta = cableadoBotones[ irespuesta ]

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
