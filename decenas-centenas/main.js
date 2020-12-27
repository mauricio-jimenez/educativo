var puntuacion;
const els = [1, 10, 100, 1000];
const nombres = ['unidades', 'decenas', 'centenas', 'millares'] 
var respuestaCorrecta;

function inicializacion() {
    
	puntuacion = document.getElementById('puntuacion');

	let botones = document.querySelectorAll("button");	
	botones.forEach( function(b) {
		// eventlistener
		b.addEventListener("click", evaluacion );
	})
}

function reset() {
	
	pregunta()
	respuestas()
}
	

function pregunta() {
	
	let pregunta
	let numero
	let posicion
	let maximo = 4
	
	numero = Math.floor( Math.random() * 10000 )
	posicion = Math.floor( Math.random() * maximo ) 
	
	while (numero < els[posicion]) {
		
		maximo -= 1
		posicion = Math.floor( Math.random() * maximo ) 
	}


	respuestaCorrecta = correcta(numero, els[posicion])

	if (posicion == 3){
		
		pregunta = '¿ Cuántos ' + nombres[posicion] + ' hay en ' + numero + ' ?' 
	}
	else {

		pregunta = '¿ Cuántas ' + nombres[posicion] + ' hay en ' + numero + ' ?' 
	}

	document.getElementById("pantalla").innerHTML = pregunta
}

function correcta(numero, unidad) {
	let t = numero % (unidad*10)
	return Math.floor(t/unidad)
}

function respuestas() {

	let base = [0,1,2,3,4,5,6,7,8,9]
	let opciones = []

	base = shuffle(base)

	opciones = base.slice(2,8)

	if (!opciones.includes(respuestaCorrecta)) {
		
		let i = Math.floor( Math.random() * 6 )
		opciones[i] = respuestaCorrecta
	}

	let botones = document.querySelectorAll("button");	
	
	for (let i=0; i<6; i++) {

		botones[i].value = opciones[i]
		botones[i].innerHTML = opciones[i]
	}
}


function evaluacion(e) {
	
	let nuevaPuntuacion

	respuesta = e.currentTarget.getAttribute("value")		

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

