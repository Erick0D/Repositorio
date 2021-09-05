//==========================================================================================================================
//Funciones que vamos a utilizar para crear nuestra aplicacion (Propio de Videotest)
//==========================================================================================================================

//En esta variable almacenaremos el intervalo de tiempo del contador
var idInterval = 0;

//Creamos los elementos necesarios para la aplicacion de Videotest

	function crear()
	{	
		var divContenedor = $("<div>",
		{
			id: "contenedor"
		});
		
		var divVideoPrincipal = $("<div>",
		{
			id: "videoPrincipal"
		});
		
		var divVideoVertical = $("<div>",
		{
			id: "videoVertical",
			"class": "videoVerticalAlign"
		});
		$(divVideoPrincipal).append(divVideoVertical);
		$(divContenedor).append(divVideoPrincipal);
		
		var divPreguntaPrincipal = $("<div>",
		{
			id: "preguntaPrincipal"
		});
		
		if($(document).data("PRMO") != '3'){
    		var divmEduca = $("<div>",
    		{
    			"class": "mEduca"
    		});
    		$(divPreguntaPrincipal).append(divmEduca);
        }
		
		for(i=0;i<aPreguntas.length;i++)
		{
			if(i<10) var ix = "0"+i;
			else var ix = i;
			
			var divPregunta = $("<div>",
			{
				id: "pregunta"+ix,
				"class": "preguntas"
			});
			
			var divEnunciado = $("<div>",
			{
				"class": "enunciado"
			});
			
			var divNumTest = $("<div>",
			{
				id: "numTest"+ix,
				"class": "numTest celda"
			});
			$(divEnunciado).append(divNumTest);
			
			var divContenidoPregunta = $("<div>",
			{
				"class": "contentPregunta celda"
			});
			
			var divEnTitulo = $("<div>",
			{
				id: "tituloResponder"+ix,
				"class": "enTitulo"
			});
			$(divEnTitulo).html(txtTituloResponder);
			$(divContenidoPregunta).append(divEnTitulo);
			
			var divEnunciadoPregunta = $("<div>",
			{
				id: "enPregunta"+ix,
				"class": "enPreguntas"
			});
			$(divContenidoPregunta).append(divEnunciadoPregunta);
			
			$(divEnunciado).append(divContenidoPregunta);
			
			var divPadRight = $("<div>",
			{
				"class": "padRight celda"
			});
			$(divEnunciado).append(divPadRight);
			
			$(divPregunta).append(divEnunciado);
			
			$(divPreguntaPrincipal).append(divPregunta);
		
			var divRespuestas = $("<div>",
			{
				id: "respuesta"+ix,
				"class": "respuestas resOptions"
			});
			$(divPregunta).append(divRespuestas);
			$(divPreguntaPrincipal).append(divPregunta);
		}
		
		var divBotones = $("<div>",
		{
			id: "botones"
		});
		var cadenaBotones = "<a href='#' id='repetirE' class='btn'>"+txtVolverAVer+"</a>";
		cadenaBotones +=  "<a href='#' id='responderE' class='btn btn-primary'>"+txtResponder+"</a>";
		cadenaBotones += "<a id='siguienteE' href='#' class='btn btn-primary'>"+txtSiguiente+"</a>";
		cadenaBotones += "<a href='#' id='finalE' onclick='terminar();' class='btn btn-primary'>"+txtTerminar+"</a>";
		$(divBotones).html(cadenaBotones);
		$(divPreguntaPrincipal).append(divBotones);
		
		$(divContenedor).append(divPreguntaPrincipal);
		
		$('#lienzo').append(divContenedor);
		
		$("#repetirE").bind("click",function(e){e.preventDefault();siguiente(0);});
		$("#responderE").bind("click",function(e){e.preventDefault();corregir();});
		$("#siguienteE").bind("click",function(e){e.preventDefault();siguiente();});
		$("#finalE").bind("click",function(e){e.preventDefault();terminar();});
		
		//Ocultamos el botón de siguiente y de final
		$("#siguienteE").hide();
		$("#finalE").hide();
		
	}
	
//Cargamos los elementos necesarios para el video
	
	function cargarVideo()
	{	
		//Definimos el código del primer video a cargar
		var idPrimerVideo = aPreguntas[0]['idvideo'];
     	for(i=0;i<aVideos.length;i++)
     	{
     		if(aVideos[i]["id"] == idPrimerVideo)
     		{
     			codPrimerVideo = aVideos[i]['contenido'];
     			codSiguienteVideo = codPrimerVideo;
     		}
     	}
     	
     	//Cargamos el primer video sobre un iframe y las caracteristicas necesarias en función del dispositivo
     	if(screen.width <= 500 || isIpadChrome())
		{
			$("#videoVertical").append("<div id='playerYT' width='640' height='360' style='position:relative;'></div>");
		}
		else
		{
			$("#videoVertical").append("<div id='playerYT' width='640' height='360' style='position:relative;'></div>");
		}
		
		//Cargamos el API de YouTube cargando el fichero JS correspondiente
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		//Cargamos las preguntas y las respuestas
		cargarBarra();
	}
	
//Si es Chrome del Ipad lo hacemos funcionar como un movil

	function isIpadChrome()
	{
		if((navigator.platform == 'iPad')&&(navigator.userAgent.toLowerCase().indexOf('crios/') > -1))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
//Cargamos la barra de seguimiento
//Esta variable contendrá la posición de cada pregunta en la barra general
var arrayPosTiempo = [];

	function cargarBarra()
	{
		//Calculamos los tiempos de cada pregunta para colocarlos en la barra de estado y el tiempo total
		tiempoTotalFragmentos = 0;
		for(p=0;p<aPreguntas.length;p++)
		{
			tiempoParcial = aPreguntas[p]["sFin"]-aPreguntas[p]["sInicio"];
			tiempoTotalFragmentos += tiempoParcial;
			arrayPosTiempo[p] = tiempoTotalFragmentos;
		}
		
		//Creamos los elementos de la barra y colocamos los elementos en su lugar correspondiente
		var divSeguimiento = $("<div>",
		{
			id: "seguimiento"
		});
		$("#lienzo").append(divSeguimiento);
		
		var divBtnP = $("<div>",
		{
			id: "btnP",
			"class": "btnTogglePlayer"
		});
		
		var divBtnS = $("<div>",
		{
			id: "btnS",
			"class": "iPlayer pPlay"
		});
		$(divBtnP).append(divBtnS);
		$("#seguimiento").append(divBtnP);
		
		var divBarraContent = $("<div>",
		{
			id: "barraContent",
			"class": "contentProgressBar"
		});
		
		var divLineaProgreso = $("<div>",
		{
			id: "lineaProgreso",
			"class": "lineBlackProgress"
		});
		
		var divLineaActivaProgreso = $("<div>",
		{
			id: "lineaActivaProgreso",
			"class": "lineActiveProgress",
			css: {"width":"0%"}
		});
		$(divLineaProgreso).append(divLineaActivaProgreso);
		$(divBarraContent).append(divLineaProgreso);
		
		var divFragmentoPulsable = $("<div>",
		{
			id: "fragmentoPulsable",
			"class": "lineActiveProgress"
		});
		$(divBarraContent).append(divFragmentoPulsable);
		
		//Calculamos y colocamos los pointers de cada pregunta con su porcentaje correspondiente
		var porcentajeFragmento = 0;
		for(i=0;i<aPreguntas.length;i++)
		{
			porcentajeParcial = (aPreguntas[i]["sFin"]-aPreguntas[i]["sInicio"]) / tiempoTotalFragmentos * 100;
			porcentajeFragmento += porcentajeParcial;
			
			if(i<10) var ix = "0"+i;
			else var ix = i;
			
			var divIndicador = $("<div>",
			{
				id: "indicador"+ix,
				"class": "groupPointer",
				css: {"left":porcentajeFragmento+"%"}
			});
			
			var divNumPointer = $("<div>",
			{
				id: "numPointer"+ix,
				"class": "pointer"
			});
			$(divNumPointer).html(i+1);
			$(divIndicador).append(divNumPointer);
			
			var divTimePointer = $("<div>",
			{
				id: "timePointer"+ix,
				"class": "timeCuestion"
			});
			$(divTimePointer).html(segundosATiempo(arrayPosTiempo[i]));
			$(divIndicador).append(divTimePointer);
			
			$(divBarraContent).append(divIndicador);
		}
		
		$("#seguimiento").append(divBarraContent);
		
		$("#btnS").click(gestionReproduccion);
		
		cargarPreguntas();
	}
	
//Cargamos las preguntas y las respuestas

	function cargarPreguntas()
	{
		for(i=0;i<aPreguntas.length;i++)
		{
			if(i<10) var ix = "0"+i;
			else var ix = i;
			
			$("#enPregunta"+ix).html(aPreguntas[i]["enunciado"]);
			$("#numTest"+ix).html((i+1)+".");		
			
			if(aPreguntas[i]["tipo"] == "unica")
			{
				for(m=0;m<aPreguntas[i]["respuestas"].length;m++)
				{
					if(m<10) var mx = "0"+m;
					else var mx = m;
				
					var divResp = $("<div>",
					{
						id: "respuesta"+ix+"_"+mx,
						"class": "respuesta"
					});
					$("#respuesta"+ix).append(divResp);
				
					var rutaImagen = rutaRecursos + aPreguntas[i]["respuestas"][m]["imagen"];
					
					var cadena = "<label class='labelFull' for='resp"+ix+"_"+mx+"' id='respL"+ix+"_"+mx+"'>";
               		cadena += "<div class='celda check'>";
                	cadena += "<input type='radio' id='resp"+ix+"_"+mx+"' name='respuesta"+ix+"'>";
                	cadena += "</div>";
                	if(aPreguntas[i]["respuestas"][m]["imagen"] != "") cadena += "<div class='celda imagenRespuesta'><a href='"+rutaImagen+"' class='fancybox'><div class='image-overlay'><div class='image-overlay-zoom'></div></div><img src='"+rutaImagen+"' class='imgRespuesta'></a></div>";
                	cadena += "<div class='celda txtOption' id='respC"+ix+"_"+mx+"'>"+aPreguntas[i]["respuestas"][m]["contenido"]+"</div>";
                	cadena += "</label>";
				
					$("#respuesta"+ix+"_"+mx).html(cadena);
					$("input:radio[name='respuesta"+ix+"']").click(activarChequedR);
				}
				$('.fancybox').fancybox();
			}
			
			if(aPreguntas[i]["tipo"] == "multiple")
			{
				for(m=0;m<aPreguntas[i]["respuestas"].length;m++)
				{
					if(m<10) var mx = "0"+m;
					else var mx = m;
				
					var divResp = $("<div>",
					{
						id: "respuesta"+ix+"_"+mx,
						"class": "respuesta"
					});
					$("#respuesta"+ix).append(divResp);
				
					var rutaImagen = rutaRecursos + aPreguntas[i]["respuestas"][m]["imagen"];
					
					var cadena = "<label class='labelFull' for='resp"+ix+"_"+mx+"' id='respL"+ix+"_"+mx+"'>";
               		cadena += "<div class='celda check'>";
                	cadena += "<input type='checkbox' id='resp"+ix+"_"+mx+"' name='respuesta"+ix+"_"+mx+"'>";
                	cadena += "</div>";
                	if(aPreguntas[i]["respuestas"][m]["imagen"] != "") cadena += "<div class='celda imagenRespuesta'><a href='"+rutaImagen+"' class='fancybox'><div class='image-overlay'><div class='image-overlay-zoom'></div></div><img src='"+rutaImagen+"' class='imgRespuesta'></a></div>";
                	cadena += "<div class='celda txtOption' id='respC"+ix+"_"+mx+"'>"+aPreguntas[i]["respuestas"][m]["contenido"]+"</div>";
                	cadena += "</label>";
				
					$("#respuesta"+ix+"_"+mx).html(cadena);
				}
				$("input:checkbox").click(activarChequedCB);
				$('.fancybox').fancybox();
			}
			
			if(aPreguntas[i]["tipo"] == "escrita")
			{
				$("#respuesta"+ix).addClass("resEscrita");
				var divRespuesta = $("<div>",
				{
					id: "respuesta"+ix+"_00",
					"class": "respuesta"
				});
				$("#respuesta"+ix).append(divRespuesta);
			
				$("#respuesta"+ix+"_00").html("<input id='resp"+ix+"_00' type='text' class='inputs' placeholder='"+txtTuRespuesta+"'>");
				
				$("#resp"+ix+"_00").keyup(gestionRespuesta);
			}
		
			if(aPreguntas[i]["tipo"] == "escrita amplia")
			{
				$("#respuesta"+ix).addClass("resEscrita");
				var divRespuesta = $("<div>",
				{
					id: "respuesta"+ix+"_00",
					"class": "respuesta"
				});
				$("#respuesta"+ix).append(divRespuesta);
			
				$("#respuesta"+ix+"_00").html("<textarea id='resp"+ix+"_00' class='inputs' rows='12' cols='40' placeholder='"+txtTuRespuesta+"'></textarea>");
				
				$("#resp"+ix+"_00").keyup(gestionRespuesta);
			}
		}
	}