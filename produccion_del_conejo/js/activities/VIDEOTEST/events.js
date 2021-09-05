//==========================================================================================================================
//Funciones que vamos a utilizar cuando el usuario comienza a interactuar con esta aplicacion (Propio del VideoTest)
//==========================================================================================================================

//Oculta la parte de presentación de instrucciones y accede a la aplicacion
//En esta variable almacenamos el id del intervalo que controlará el fin de cada fragmento de video
var idIntervalFinalVideo = 0;
var todoOk = true;

    function comenzar()
    {	cargarVideo();
     	$('#contentPreActividad').hide();
     	$('#contentAct').css('top',0);
     	
     	//Inicializamos la puntuacion
     	$("#numPuntos").html("0");
     	
     	//Activamos el pointer correspondiente
     	$("#numPointer00").addClass("pointerActivo");
     	
     	//Inicializamos los eventos de pointer para poder saltar ala pregunta siguiente
     	$(".groupPointer").click(saltarHastaPregunta);
     	
        //Controlamos las preguntas al principio
	    var tmp = aPreguntas[0]['sFin'] - aPreguntas[0]['sInicio'];
        if(tmp == 0) aPreguntas[0]['sFin'] = 1;
        
		 //Si no es un dispositivo pequeño, cargamos el primer fragmento de video y lo empezamos a reproducir. Si es pequeño, seremos nosotros quien hagamos click en el play para empezar.
		 
		var continuar = true;

     	if((screen.width > 500)&&(!isIpadChrome()))
		{
			 //Comenzamos con la reproduccion del primer fragmento de video
			if (typeof player === "undefined") {
				continuar = false;
				setTimeout(reintentarComenzar,300);
			} else {
				if (typeof player.loadVideoById === "undefined") {
					continuar = false;
					setTimeout(reintentarComenzar,300);
				} else {
					player.loadVideoById({'videoId': codPrimerVideo, 'startSeconds': aPreguntas[0]['sInicio'], 'endSeconds': aPreguntas[0]['sFin']});
				}
			}
		}
		
		if (continuar) {
			//Lanzamos el intervalo que controlará el final de cada video
			idIntervalFinalVideo = setInterval(compruebaFinalVideo,500);
				
			//Lanzamos el contador de tiempo
			idInterval = setInterval(contador,1000);
		}

	}

	function reintentarComenzar() {
		if (typeof player === "undefined") {
			setTimeout(reintentarComenzar,300);
		} else {
			if (typeof player.loadVideoById === "undefined") {
				setTimeout(reintentarComenzar,300);
			} else {
				player.loadVideoById({'videoId': codPrimerVideo, 'startSeconds': aPreguntas[0]['sInicio'], 'endSeconds': aPreguntas[0]['sFin']});
			
				//Lanzamos el intervalo que controlará el final de cada video
				idIntervalFinalVideo = setInterval(compruebaFinalVideo,500);
						
				//Lanzamos el contador de tiempo
				idInterval = setInterval(contador,1000);
			}
		}
	}
	   

   	
//Redimensionamos la aplicacion al cambiar de tamaño la pantalla

	function redimensionar()
	{	
		//Reinicializamos la descripción Inicial de Usuario
		cargarDescripcionInicio();
	}

//Funcion que crea el objeto de la API de YouTube
//Variable para el objeto de YouTube
var player;
	
	function onYouTubeIframeAPIReady() 
	{
		if(screen.width <= 500 || isIpadChrome())
		{
			cargaVideoPeq(codPrimerVideo,aPreguntas[0]['sInicio'],aPreguntas[0]['sFin']);
		}
		else
		{	
  			player = new YT.Player('playerYT', 
  			{
  				playerVars: {
  					controls:0,
  					showinfo:0,
  					rel:0,
  					border:1,
  					fs:1,
  					wmode:'transparent'
       			},
  				events:
  				{
  					//Este evento en ocasiones falla, por eso nos cubrimos ante los errores llevando un intervalo paralelo que también comprueba el final
  					'onStateChange': onPlayerStateChange
  				}
  			});
  		}
	}
	
	function cargaVideoPeq(cod,com,fin) 
	{
  		player = new YT.Player('playerYT', 
  		{
  			videoId:cod,
  			playerVars: {
  				controls:0,
  				showinfo:0,
  				rel:0,
  				border:1,
  				fs:1,
  				wmode:'transparent',
  				start:com,
  				end:fin
       		},
  			events:
  			{
  				//Este evento en ocasiones falla, por eso nos cubrimos ante los errores llevando un intervalo paralelo que también comprueba el final
  				'onStateChange': onPlayerStateChange
  			}
  		});
	}

//Funcion que se ejecuta cuando cambia el estado de la reproducción, controlamos cuando termina

	function onPlayerStateChange(e)
	{
		if(e.data == 0)
		{
			if(player.getCurrentTime() >= aPreguntas[posicionActual]['sFin'])
			{
				if(mostrada == 0) mostrarPregunta();
			}
		}
	}

//Funcion que comprueba el final del video cada cierto tiempo mediante un intervalo

	function compruebaFinalVideo()
	{
		//Si estamos en reproducción vamos actualizando la barra de progreso
		if(player.getPlayerState() == 1)
		{
			actualizaBarra();
			if($("#btnS").hasClass("pPlay")) $("#btnS").removeClass("pPlay").addClass("pPause"); 
		}
		
		//Si estamos en pausa ponemos el boton de play correctamente
		if(player.getPlayerState() == 2)
		{
			if($("#btnS").hasClass("pPause")) $("#btnS").removeClass("pPause").addClass("pPlay"); 
		}
		
		//Si ha terminado
		if(player.getPlayerState() == 0)
		{
			if(player.getCurrentTime() >= aPreguntas[posicionActual]['sFin']-2)
			{
				//Dejamos de controlar el proceso del video
				clearInterval(idIntervalFinalVideo);
				//Mostramos la pregunta
				if(mostrada == 0) mostrarPregunta();
				setTimeout(function(){
					//Eliminamos el video
					player.destroy();
					//Si es un dispositivo grande, cargamos el siguiente ya
					if((screen.width > 500)&&(!isIpadChrome()))
					{
						$("#videoVertical").append("<div id='playerYT' width='640' height='360' style='position:relative;'></div>");
						onYouTubeIframeAPIReady();
					}	
					//Actualizamos el boton de play
					if($("#btnS").hasClass("pPause")) $("#btnS").removeClass("pPause").addClass("pPlay");
				},600);
			}
		}
		//Si no ha terminado, y el usuario mueve la barra de proceso en un dispositivo pequeño, lo devolvemos al punto de inicio del video
		else
		{
			if(screen.width <= 500 || isIpadChrome())
			{
				if(((player.getPlayerState() == 1)||(player.getPlayerState() == 2))&&((player.getCurrentTime()+2 < aPreguntas[posicionActual]['sInicio'])||(player.getCurrentTime()-2 > aPreguntas[posicionActual]['sFin'])))
				{
					player.seekTo(aPreguntas[posicionActual]['sInicio']-1);
					actualizaBarra();
				}
			}
		}
	}
	
//Actualizamos el fragmento de video y la pregunta cuando volvemos a ver un fragmento, o saltamos al siguiente
var posicionActual = 0;
var codSiguienteVideo = 0;

	function siguiente(modo)
	{
		$(".pointer").removeClass("pointerActivo");
		//Si es para avanzar al siguiente fragmento actualizamos la posicion
		if(modo != 0)
		{
			$("#siguienteE").hide();
			$("#responderE").show();
			$("#repetirE").show();
		
			posicionActual++;
			
			var idSiguienteVideo = aPreguntas[posicionActual]['idvideo'];
     		for(i=0;i<aVideos.length;i++)
     		{
     			if(aVideos[i]["id"] == idSiguienteVideo)
     			{
     				codSiguienteVideo = aVideos[i]['contenido'];
     			}
     		}
     	}
     	else
     	{
     		while(aPreguntas[posicionActual]['sFin'] == aPreguntas[posicionActual]['sInicio']) posicionActual--;
     	}
     	
     	//Si no es el ultimo fragmneto
     	if(posicionActual != aPreguntas.length)
     	{
     		if(aPreguntas[posicionActual]['sFin'] != aPreguntas[posicionActual]['sInicio'])
     		{
     			//Cargamos el video correspondiente en función del dispositivo
     			if(screen.width <= 500 || isIpadChrome())
				{
					$("#videoVertical").append("<div id='playerYT' width='640' height='360' style='position:relative;'></div>");
					cargaVideoPeq(codSiguienteVideo,aPreguntas[posicionActual]['sInicio'],aPreguntas[posicionActual]['sFin']);
				}
				else
				{
					player.loadVideoById({'videoId': codSiguienteVideo, 'startSeconds': aPreguntas[posicionActual]['sInicio'], 'endSeconds': aPreguntas[posicionActual]['sFin']});
				}
				//Lanzamos el intervalo de control de video
				idIntervalFinalVideo = setInterval(compruebaFinalVideo,500);
				//Ocultamos la pregunta
				ocultarPregunta();
     		}
     		else
     		{
     			mostrarPregunta();
     		}
			
			//Actualizamos el pointer
			if(posicionActual < 10) cadenaPosicionActual = "0"+posicionActual;
			else cadenaPosicionActual = posicionActual;
			$("#numPointer"+cadenaPosicionActual).addClass("pointerActivo");
     	}
	}
	
//Saltamos hasta la pregunta activa al hacer click sobre el pointer

	function saltarHastaPregunta(e)
	{
		if(!$("#btnS").hasClass("disable"))
		{
			var id = e.target.id;
			var idL = e.target.id.length;
			if(parseInt(id.substring(idL-2,idL)) == posicionActual)
			{
				//Dejamos de controlar el proceso del video
				clearInterval(idIntervalFinalVideo);
				//Mostramos la pregunta
				if(mostrada == 0) mostrarPregunta();
				setTimeout(function(){
					//Eliminamos el video
					player.destroy();
					//Si es un dispositivo NO tactil, cargamos el siguiente ya
					if((screen.width > 500)&&(!isIpadChrome()))
					{
						$("#videoVertical").append("<div id='playerYT' width='640' height='360' style='position:relative;'></div>");
						onYouTubeIframeAPIReady();
					}
					//Actualizamos el boton de play
					if($("#btnS").hasClass("pPause")) $("#btnS").removeClass("pPause").addClass("pPlay");
				},600);
			}
		}
	}

//Mostramos la pregunta correspondiente
//Variable que controla si esta mostrada o no la pregunta para evitar duplicar
var mostrada = 0;

	function mostrarPregunta()
	{
		mostrada = 1;
		$("#btnS").addClass("disable");
		$("#btnS").unbind("click");
		$(".preguntas").hide();
		if(posicionActual < 10) cadenaPosicionActual = "0"+posicionActual;
		else cadenaPosicionActual = posicionActual;
		porcentaje = 100 * arrayPosTiempo[posicionActual] / tiempoTotalFragmentos;
		$("#lineaActivaProgreso").width(porcentaje+"%");
		//$("#preguntaPrincipal").show();
		$("#contenedor").addClass("transicion");
		
		$("#pregunta"+cadenaPosicionActual).show();
		gestionRespuesta();
	}
	
//Gestionamos el no poder responder si no se ha seleccionado nada o no se ha escrito nada

	function gestionRespuesta()
	{
		var pa = posicionActual;
		var pax = cadenaPosicionActual;
		
		if(aPreguntas[pa]["tipo"] == "unica")
		{
			for(m=0;m<aPreguntas[pa]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
			
				if($("#resp"+pax+"_"+mx+":checked").val() == "on")
				{
					$("#responderE").unbind("click");
					$("#responderE").click(function(e){e.preventDefault();corregir();});
					$("#responderE").removeClass("disable").addClass("btn-primary");
					break;
				}
				else
				{
					$("#responderE").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
				}
			}
		}
				
		if(aPreguntas[pa]["tipo"] == "multiple")
		{
			for(m=0;m<aPreguntas[pa]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
					
				if($("#resp"+pax+"_"+mx).is(':checked'))
				{
					$("#responderE").unbind("click");
					$("#responderE").click(function(e){e.preventDefault();corregir();});
					$("#responderE").removeClass("disable").addClass("btn-primary");
					break;
				}
				else
				{
					$("#responderE").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
				}
			}
		}
		
		if(aPreguntas[pa]["tipo"].substring(0,7) == "escrita")
		{
			if($("#resp"+pax+"_00").val().length != 0)
			{
				$("#responderE").unbind("click");
				$("#responderE").click(function(e){e.preventDefault();corregir();});
				$("#responderE").removeClass("disable").addClass("btn-primary");
			}
			else
			{
				$("#responderE").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
			}
		}
		
		if(correccion[pa] != undefined)
		{
			if(posicionActual == aPreguntas.length-1)
			{
				$("#siguienteE").hide();
				$("#responderE").hide();
				$("#repetirE").hide();
				$("#finalE").show();
			}
			else
			{
				$("#siguienteE").show();
				$("#responderE").hide();
				$("#repetirE").hide();
			}	 
		}
	}

//Ocultamos la pregunta activa

	function ocultarPregunta()
	{
		mostrada = 0;
		$(".preguntas").hide();
		//$("#preguntaPrincipal").hide();
		$("#contenedor").removeClass("transicion");
		$("#btnS").removeClass("disable");
		$("#btnS").click(gestionReproduccion);
	}

//Activar elemento seleccionado de preguntas de tipo 'unica' (Radio)

	function activarChequedR(e)
	{
		var id = e.target.getAttribute('id');
		var cadenaIdP = id.substring(4,6);
		var cadenaId = id.substring(4,9);
		$("#respuesta"+cadenaIdP+" .respuesta").removeClass("activa");
		$("#respuesta"+cadenaId).addClass("activa");
		gestionRespuesta();
	}
	
//Activar elemento seleccionado de preguntas de tipo 'multiple' (Checkbox)
	
	function activarChequedCB(e)
	{
		var id = e.target.getAttribute('id');
		var cadenaId = id.substring(4,9);
		if($("#respuesta"+cadenaId).hasClass("activa")) $("#respuesta"+cadenaId).removeClass("activa");
		else $("#respuesta"+cadenaId).addClass("activa");
		gestionRespuesta();
	}
	
//Corregimos la pregunta correspondiente segun el tipo que sea
//Array que controla la correccion de las preguntas
var correccion = [];

	function corregir()
	{
		var k = posicionActual;
		
		if(k<10) var kx = "0"+k;
		else var kx = k;
		
		creaResumen(k);
			
		if(aPreguntas[k]["tipo"] == "unica")
		{
			for(m=0;m<aPreguntas[k]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
						
				if($("#resp"+kx+"_"+mx+":checked").val() == "on")
				{
					if(aPreguntas[k]["respuestas"][m]["resp"] == 1)
					{
						correccion[k] = "OK";
					}
					else
					{
						correccion[k] = "MAL";
					}
				}
             }
           
		}
				
		if(aPreguntas[k]["tipo"] == "multiple")
		{
			for(m=0;m<aPreguntas[k]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
					
				if($("#resp"+kx+"_"+mx).is(':checked'))
				{
					if(aPreguntas[k]["respuestas"][m]["resp"] == 1)
					{
						correccion[k] = "OK";
					}
					else
					{
						correccion[k] = "MAL";
						break;
					}
				}
				else
				{
					if(aPreguntas[k]["respuestas"][m]["resp"] == 1)
					{
						correccion[k] = "MAL";
						break;
					}
				}
			}
		}
				
		if(aPreguntas[k]["tipo"].substring(0,7) == "escrita")
		{
			for(m=0;m<aPreguntas[k]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
					
				var cont = $("#resp"+kx+"_00").val();
				var resp = aPreguntas[k]["respuestas"][m]["contenido"];
				
				if(sensible_mayusculas == "no")
				{	 
					cont = cont.toUpperCase();
					resp = resp.toUpperCase();
				}
		
				if(sensible_acentos == "no")
				{ 
					cont = borraAcentos(cont);
					resp = borraAcentos(resp);
				}
					
				if(cont == resp)
				{
					correccion[k] = "OK";
					break;
				}
				else
				{
					correccion[k] = "MAL";
				}
			}
		}

		if(posicionActual == aPreguntas.length-1)
		{
			$("#siguienteE").hide();
			$("#responderE").hide();
			$("#repetirE").hide();
			$("#finalE").show();
		}
		else
		{
			$("#siguienteE").show();
			$("#responderE").hide();
			$("#repetirE").hide();
		} 
		
		if(correccion[k] == "OK")
		{
			$("#numPointer"+kx).addClass("pointerOk");
			actualizaPuntos();
		}
		else
		{
			$("#numPointer"+kx).addClass("pointerMal");
			todoOk = false;
		}
		
		verCorreccion();
	}

//En caso de que la aplicacion no sea sensible a acentos, eliminamos los acentos antes de comparar las cadenas
	
	function borraAcentos(cadenaQuitar) 
	{  
     	var conAcentos= "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";  
        var sinAcentos = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";  
        var nueva = "";
        var encontrada = 0;
        for(i=0;i<cadenaQuitar.length;i++) 
        {	
        	encontrada = 0;  
        	for(j=0;j<conAcentos.length;j++)
        	{
             	if(cadenaQuitar[i] == conAcentos[j])
                {
                	nueva += sinAcentos[j];
                	encontrada = 1;
                	break;
                } 
       		}
       		if(encontrada == 0) nueva += cadenaQuitar[i]; 	  
    	}
     	return nueva;   
 	}
 	
//Generamos la corrección para cada pregunta en función del tipo que sea
var tuRespuesta = [];

	function verCorreccion()
	{	
		var p = posicionActual;
		
		if(p<10) var px = "0"+p;
		else var px = p;
				
		if(aPreguntas[p]["tipo"] == "unica")
		{
			var tuRespuestaInd = new Array();
			
			$("#pregunta"+px+" input").attr("disabled","true");
			$("#pregunta"+px+" .respuesta").removeClass("activa");
			
			for(m=0;m<aPreguntas[p]["respuestas"].length;m++)
			{	
				if(m<10) var mx = "0"+m;
				else var mx = m;
					
				if($("#resp"+px+"_"+mx+":checked").val() == "on")
				{	
					tuRespuestaInd[m] = 1;
					if(aPreguntas[p]["respuestas"][m]["resp"] == 1)
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeOk'></span>");
						$("#respC"+px+"_"+mx).addClass("optionOk");
					}
					else
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeError'></span>");
					}
				}
				else
				{
					tuRespuestaInd[m] = 0;
					if(aPreguntas[p]["respuestas"][m]["resp"] == 1)
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeRadioOk'></span>");
					}
					else
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeRadioClear'></span>");
					}
				}
				
				tuRespuesta[p] = tuRespuestaInd;	
				var contenidoLabel = $("#respL"+px+"_"+mx).html();
				var divLabel = $("<div>",
				{
					id: "respL"+px+"_"+mx,
					"class": "labelFull"
				});
				$(divLabel).html(contenidoLabel);
				$("#respL"+px+"_"+mx).replaceWith(divLabel);
			}
		}
		
		if(aPreguntas[p]["tipo"] == "multiple")
		{
			var tuRespuestaInd = new Array();
			
			$("#pregunta"+px+" input").attr("disabled","true");
			$("#pregunta"+px+" .respuesta").removeClass("activa");
			
			for(m=0;m<aPreguntas[p]["respuestas"].length;m++)
			{	
				if(m<10) var mx = "0"+m;
				else var mx = m;
					
				if($("#resp"+px+"_"+mx).is(':checked'))
				{
					tuRespuestaInd[m] = 1;
					if(aPreguntas[p]["respuestas"][m]["resp"] == 1)
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeOk'></span>");
						$("#respC"+px+"_"+mx).addClass("optionOk");
					}
					else
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeError'></span>");
					}
				}
				else
				{
					tuRespuestaInd[m] = 0;
					if(aPreguntas[p]["respuestas"][m]["resp"] == 1)
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeCheckboxOk'></span>");
					}
					else
					{
						$("#resp"+px+"_"+mx).replaceWith("<span class='elemenForm typeCheckboxClear'></span>");
					}
				}
				
				tuRespuesta[p] = tuRespuestaInd;	
				var contenidoLabel = $("#respL"+px+"_"+mx).html();
				var divLabel = $("<div>",
				{
					id: "respL"+px+"_"+mx,
					"class": "labelFull"
				});
				$(divLabel).html(contenidoLabel);
				$("#respL"+px+"_"+mx).replaceWith(divLabel);
			}
		}
			
		if(aPreguntas[p]["tipo"].substring(0,7) == "escrita")
		{
			$("#pregunta"+px+" input").attr("disabled","true");
			$("#pregunta"+px+" textarea").attr("disabled","true");
			
			var cadenaPosibles = "<div class='posiblesRespuestas'>";
			cadenaPosibles += "<div class='titPosiblesRespuestas'>"+txtPosiblesRespuestas+"</div>";
			cadenaPosibles += "<div class='contentRespuestas'>";
			cadenaPosibles += "<ol>";
							
			for(m=0;m<aPreguntas[p]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
				
				cadenaPosibles += "<li>"+aPreguntas[p]["respuestas"][m]["contenido"]+"</li>";
			}	
				
			cadenaPosibles += "</ol>";
			cadenaPosibles += "</div></div>";
				
			$("#pregunta"+px).append(cadenaPosibles);
				
			if(correccion[p] == "OK")
			{
				$("#resp"+px+"_00").addClass("inputOk");
			}
			else
			{
				$("#resp"+px+"_00").addClass("inputError");
			}
		}
		if(correccion[p] == "OK") $("#pregunta"+px).prepend("<div class='alertTop correcta'>"+txtRespuestaCorrecta+"</div>");
		else $("#pregunta"+px).prepend("<div class='alertTop incorrecta'>"+txtRespuestaIncorrecta+"</div>");
		
		//Creamos los elementos para la información adicional
		if(globalFeedback == 1) 
		{
			if(aPreguntas[p]["feedBack"] != "")
			{
				var cadenaAdicional = "<div class='iconInfoAdicional'>";
    			cadenaAdicional += "<div class='titInfoAdicional'>"+txtInfoAdicional+"</div>";
        		cadenaAdicional += "<div class='txtInfoAdicional' id='textoAdicional"+px+"'></div>";
    			cadenaAdicional += "</div>";
    			
    			$('#pregunta'+px).append(cadenaAdicional);
				
				$("#textoAdicional"+px).html(aPreguntas[p]["feedBack"]);
			}
		}
	}
	
//Actualizar puntos
var puntosReg = 0;

	function actualizaPuntos()
	{
		var puntosSumar = Math.floor(100 / aPreguntas.length); 
		var puntosActuales = parseInt(puntosReg);
		var puntosTotales = parseInt(puntosSumar + puntosActuales);
		if (puntosTotales > 100) {
			puntosTotales = 100;
		}
		if ((todoOk) && (posicionActual == (aPreguntas.length - 1))) {
			puntosTotales = 100;
		}
		puntosReg = puntosTotales;
		$("#numPuntos").html(puntosReg);
		
	}
	
//Cuenta atras del tiempo de los videos

	function actualizaBarra()
	{
		var tiempoActual = 0;
		if(posicionActual > 0)
		{
			tiempoActual += arrayPosTiempo[posicionActual-1];
		}
		tiempoActual += player.getCurrentTime()-aPreguntas[posicionActual]["sInicio"];
		
		var porcentaje = tiempoActual*100/tiempoTotalFragmentos;
		$("#lineaActivaProgreso").width(porcentaje+"%");
	}

//Gestionamos el play y pause de los videos

	function gestionReproduccion()
	{
		if($("#btnS").hasClass("pPlay"))
		{
			$("#btnS").removeClass("pPlay").addClass("pPause");
			player.playVideo();
		}
		else if($("#btnS").hasClass("pPause"))
		{
			$("#btnS").removeClass("pPause").addClass("pPlay");
			player.pauseVideo();
		}  
	}

//Convertimos los segundos a formato de tiempo

	function segundosATiempo(segundos)
	{
		var min = parseInt(segundos/60);
		if(min<10) min = "0"+min;
		var seg = segundos % 60;
		if(seg<10) seg = "0"+seg;
		var cadena = min+":"+seg;
		return cadena;
	}
	
//Terminamos el VideoTest y mostramos la pantalla final
//Variable para evitar que ejecute esta función dos veces
var pasado = 0;

	function terminar()
	{
		if(pasado == 0)
		{
			pasado = 1;
			preguntasCorrectas = 0;
		
			for(j=0;j<aPreguntas.length;j++)
			{
				if(correccion[j] == "OK") preguntasCorrectas++;
			}
		
			preguntasErroneas = aPreguntas.length - preguntasCorrectas;
		
			porcentajeAcierto = 100*preguntasCorrectas/aPreguntas.length;
		
			if(preguntasCorrectas >= preguntasErroneas)
			{
				cargarPantallaFinal("OK",getDatosRespuestas(1));
			}
			else
			{
				cargarPantallaFinal("noSuperada",getDatosRespuestas(0));
			}
		}
	}

//Completamos la pantalla final con la corrección de las palabras y su feedback si esque lo tiene

	function completarPantallaFinal()
	{	
		$("#correccion").addClass("resultadosTest");
		
		var cadena = "<div class='grafCorrecion'>";
        cadena += "<div class='titGrafica'>"+ txtTuPuntuacionEs +"</div>";
        cadena += "<div class='contentBarGrafCorreccion'>";
        cadena += "<div class='barGrafCorreccion'>";
        cadena += "<div class='numPuntuacion'>"+parseInt(porcentajeAcierto)+"%</div>";
        cadena += "<div class='barBienGrafCorreccion' style='width:"+parseInt(porcentajeAcierto)+"%'></div>";
        cadena += "</div>";
        cadena += "<div class='numBien numGrafica'>" + preguntasCorrectas + " " + txtBien + "</div>";
        cadena += "<div class='numMal numGrafica'>" + preguntasErroneas + " " + txtMal + "</div>";
        cadena += "</div>";
        cadena += "<div class='clear'></div>";
        cadena += "</div>";
        cadena += "<div class='btnsExtraResumen'>";
		cadena += "<a href='#' class='btn btn-large btn-primary' id='btnVerCorreccion'>"+txtVerCorregir+"</a>";    
		if(ocultar_reiniciar != '1') {
			cadena += "<a href='#' class='btn' id='btnReiniciar'>"+txtVolverJugar+"</a>";    
		}   
        $("#correccion").html(cadena);
        
		$("#btnVerCorreccion").click(function(e){e.preventDefault();verCorreccionFinal();});
		if(ocultar_reiniciar != '1') {
			$("#btnReiniciar").click(function(e){
				e.preventDefault();
				try{
					parent.recargaActividad();
				}catch(error){
				}
				location.reload();
			});
		}
        
        $(".groupInfoRespuestas").hide();      	
	}

//Mostramos la corrección de las preguntas
var correccionNum = 0;

	function verCorreccionFinal()
	{
		$('#resumen').hide();
		$('#contentAct').show();
		$("#seguimiento").hide();
		$("#contenedor").css("bottom","0");
		
		mostrarC();
		
		var cadenaBotones = "";
		cadenaBotones +=  "<a href='#' id='atrasE' class='btn'>"+txtAnterior+"</a>";
		cadenaBotones += "<a id='adelanteE' href='#' class='btn'>"+txtSiguiente+"</a>";
		cadenaBotones += "<a id='finalE' href='#' class='btn btn-primary'>"+txtTerminar+"</a>";
		
		$("#botones").html(cadenaBotones);
		
		$("#finalE").hide();
		
		$("#atrasE").addClass("disable");
		if(correccionNum == aPreguntas.length-1)
		{
			$("#adelanteE").hide();
			$("#finalE").show();
		}  
		
		$("#atrasE").click(function(e){
			e.preventDefault();
			if(correccionNum > 0)
			{
				correccionNum--;
				mostrarC();
			}
		});
		$("#adelanteE").click(function(e){
			e.preventDefault();
			if(correccionNum < aPreguntas.length-1)
			{
				correccionNum++;
				mostrarC();
			}
		});
		$("#finalE").click(function(e){
			e.preventDefault();
			correccionNum = 0;
			$('#resumen').show();
			$('#contentAct').hide();
		});
	}

//Mostramos la pregunta correspondiente a la hora de revisar la corrección
	
	function mostrarC()
	{
		if(correccionNum == 0) $("#atrasE").addClass("disable");
		else $("#atrasE").removeClass("disable");
		if(correccionNum == aPreguntas.length-1)
		{
			$("#adelanteE").hide();
			$("#finalE").show();
		} 
		else
		{
			$("#adelanteE").show();
			$("#finalE").hide();
		} 
		
		if(correccionNum < 10) var sig = "0"+correccionNum;
		else var sig = correccionNum;
		
		$(".preguntas").hide();
		$("#preguntaPrincipal").show();
		$("#pregunta"+sig).show();
	}
	
//Creamos un array con el resumen de la actividad para poder almacenarla en SCORM si fuera necesario
var resumen = new Array();

	function creaResumen(s)
	{	
		if(s<10) var sx = "0"+s;
		else var sx = s;
		
		var aPreg = new Array();
		aPreg["tipo"] = aPreguntas[s]["tipo"];
		aPreg["enunciado"] = aPreguntas[s]["enunciado"];
		aPreg["respuestasPosibles"] = aPreguntas[s]["respuestas"];
			
		var aResp = new Array();	
		if(aPreguntas[s]["tipo"] == "unica")
		{	
			for(m=0;m<aPreguntas[s]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
				
				if($("#resp"+sx+"_"+mx+":checked").val() == "on")
				{
					aResp[m] = 1;
				}
				else
				{
					aResp[m] = 0;
				}
			}
		}	
			
		if(aPreguntas[s]["tipo"] == "multiple")
		{
			for(m=0;m<aPreguntas[s]["respuestas"].length;m++)
			{
				if(m<10) var mx = "0"+m;
				else var mx = m;
				
				if($("#resp"+sx+"_"+mx).is(':checked'))
				{
					aResp[m] = 1;
				}
				else
				{
					aResp[m] = 0;
				}
			}
		}
				
		if(aPreguntas[s]["tipo"].substring(0,7) == "escrita")
		{		
			aResp[0] = $("#resp"+sx+"_00").val();
		}
		
		aPreg["respuestasDadas"] = aResp;
		
		resumen[s] = aPreg;
	}

	function getDatosRespuestas(s) {
		var datos = {};
		datos['m'] = {};
		datos['m']['s'] = s;
		datos['r'] = [];
		for(posicion=0;posicion<aPreguntas.length;posicion++) {
			datos['r'][posicion] = {};
			if (correccion[posicion] == 'OK') {
				datos['r'][posicion]['s'] = 1;
			} else {
				datos['r'][posicion]['s'] = 0;
			}
			datos['r'][posicion]['i'] = posicion;
			if(posicion<10) var kx = "0"+posicion;
			else var kx = posicion;
			switch (aPreguntas[posicion]['tipo']) {
			case 'unica':
			case 'multiple':
				datos['r'][posicion]['a'] = '';
				for(m=0;m<aPreguntas[posicion]['respuestas'].length;m++) {
					if (m<10) var mx = "0"+m;
					else var mx = m;
					if (($('#respL'+kx+'_'+mx+' .elemenForm').hasClass('typeError')) || ($('#respL'+kx+'_'+mx+' .elemenForm').hasClass('typeOk'))) {
						if (datos['r'][posicion]['a'] != '') {
							datos['r'][posicion]['a'] += ' - ';
						}
						datos['r'][posicion]['a'] += $('#respC'+kx+'_'+mx).html();
					}
				}			
				break;
			case 'escrita':
			case 'escrita amplia':
				datos['r'][posicion]['a'] = $("#resp"+kx+"_00").val();
				break;
			}
		}
		return datos;
	}

	function actualizaPuntosFinal(tipoAlerta) {
		
	}