var puntuacion;
var opciones = ["izquierda", "derecha"];
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

	let i = Math.floor( Math.random() * 2 )
	respuestaCorrecta = i
	document.getElementById("pantalla").innerHTML = opciones[i]
}

function evaluacion(e) {
	
	let nuevaPuntuacion

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
	
	reset();
}
	
inicializacion()
reset()

