var puntuacion;
var opciones = ["porotos", "maiz", "leche", "damascos", "crayones", "botones", "avena", "arroz", "algodon"];
var respuestaCorrecta;
var imagenes;

function inicializacion() {
    
	puntuacion = document.getElementById('puntuacion');

	imagenes = document.querySelectorAll("img");	
	imagenes.forEach( function(b) {
		// eventlistener
		b.addEventListener("click", evaluacion );
	})
}

function reset() {

	respuestaCorrecta = Math.floor( Math.random() * 2 )
	let i = Math.floor( Math.random() * 9 )
	cargaImagenes(i)
	cargaMensaje(i)
}

function cargaImagenes(i) {
	if (respuestaCorrecta == 0) {
		imagenes[0].src = "../imagenes/compara/" + opciones[i] + "-" + "poco" + ".jpg"
		imagenes[1].src = "../imagenes/compara/" + opciones[i] + "-" + "mucho" + ".jpg"
	} else {
		imagenes[0].src = "../imagenes/compara/" + opciones[i] + "-" + "mucho" + ".jpg"
		imagenes[1].src = "../imagenes/compara/" + opciones[i] + "-" + "poco" + ".jpg"
	}
}

function cargaMensaje(i) {
	document.getElementById("mensaje").innerHTML = "¿Dónde hay menos " + opciones[i] + "?"
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
	
inicializacion()
reset()

