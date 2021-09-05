//==========================================================================================================================
//Funciones que vamos a utilizar para inicializar elementos de nuestra aplicacion (Propio del VideoTest)
//==========================================================================================================================
   
//Extraemos del XML todos los datos necesarios para nuestra aplicacion

	function extraerDatos()
	{
		tipo_actividad = "Videotest";
		
		numero_intentos = "noDefinido";
        
        try{
			origen_recursos = xmlDoc.getElementsByTagName("origen_recursos")[0].childNodes[0].nodeValue;
		}catch(e)
		{
			origen_recursos="";
		}
        
		if(origen_recursos){
			rutaRecursos = origen_recursos;
		}
		try{
        	texto_final = xmlDoc.getElementsByTagName("texto_final")[0].childNodes[0].nodeValue;
        }catch(e){
        	texto_final = '';
		}
		ocultar_reiniciar = xmlDoc.getElementsByTagName("ocultar_reiniciar")[0].childNodes[0].nodeValue;
		ocultar_respuestas = xmlDoc.getElementsByTagName("ocultar_respuestas")[0].childNodes[0].nodeValue;
		ocultar_redes = xmlDoc.getElementsByTagName("ocultar_redes")[0].childNodes[0].nodeValue;
		
        try{
        	colorFuente = xmlDoc.getElementsByTagName("color_fuente")[0].childNodes[0].nodeValue;
        	colorFuenteB = xmlDoc.getElementsByTagName("color_fuente_b")[0].childNodes[0].nodeValue;
        	colorFuenteInt = colorFuente.substring(2,colorFuente.length);
        	colorFuente = "#"+colorFuente.substring(2,colorFuente.length);
        	colorFuenteB = "#"+colorFuenteB.substring(2,colorFuenteB.length);
        }catch(e){
        	colorFuente = "#FFFFFF";
        	colorFuenteB = "#111111";
        }
				colorFondo = xmlDoc.getElementsByTagName("color_fondo_h")[0].childNodes[0].nodeValue;
				colorFondoInt = colorFondo.substring(2,colorFondo.length);
        colorFondo = "#"+colorFondo.substring(2,colorFondo.length);
				colorBotones = xmlDoc.getElementsByTagName("color_botones_h")[0].childNodes[0].nodeValue;
				colorBotones = colorBotones.substring(2,colorBotones.length);
        try{
        	logoPersonalizado = xmlDoc.getElementsByTagName("logoPersonalizado")[0].childNodes[0].nodeValue;
        }catch(e){
        	logoPersonalizado = "";
        }
        try{
        	franjaPersonalizada = xmlDoc.getElementsByTagName("franjaPersonalizada")[0].childNodes[0].nodeValue;
        }catch(e){
        	franjaPersonalizada = "";
        }
		
		sensible_mayusculas = xmlDoc.getElementsByTagName("sensible_mayusculas")[0].childNodes[0].nodeValue;
		sensible_acentos = xmlDoc.getElementsByTagName("sensible_acentos")[0].childNodes[0].nodeValue;
		if(xmlDoc.getElementsByTagName("sensible_mayusculas_ocultar")[0].childNodes[0] != undefined)
		{
			sensible_mayusculas_ocultar = xmlDoc.getElementsByTagName("sensible_mayusculas_ocultar")[0].childNodes[0].nodeValue;
		}
		else
		{
			sensible_mayusculas_ocultar = "no";
		}
		
		if(xmlDoc.getElementsByTagName("sensible_acentos_ocultar")[0].childNodes[0] != undefined)
		{
			sensible_acentos_ocultar = xmlDoc.getElementsByTagName("sensible_acentos_ocultar")[0].childNodes[0].nodeValue;
		}
		else
		{
			sensible_acentos_ocultar = "no";
		}
		
		if (xmlDoc.getElementsByTagName("autor")[0].childNodes.length == 0) {
			autor = '';
		} else {
			autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;
		}
		descripcionUsuario = xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;
		globalFeedback = xmlDoc.getElementsByTagName("globalFeedback")[0].childNodes[0].nodeValue;
		
		registro = xmlDoc.getElementsByTagName("registro")[0];
		
		tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
		if(tiempo == "si") tiempo = xmlDoc.getElementsByTagName("tiempo")[0].attributes.getNamedItem("maximo").value;
		else if (tiempo == "no") tiempo = 0;
			
		descripcion = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
		enunciado = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;	
		txtTituloResponder = xmlDoc.getElementsByTagName("tituloResponder")[0].childNodes[0].nodeValue;
		
		codvideos = xmlDoc.getElementsByTagName("codvideo");
		
		aVideos = new Array();
		for(k=0;k<codvideos.length;k++)
		{
			infoVideos = new Array();
			
			infoVideos["id"] = codvideos[k].attributes.getNamedItem("id").value;
			infoVideos["contenido"] = codvideos[k].childNodes[0].nodeValue;
			
			aVideos[k] = infoVideos;
		}
		
		secuencias = xmlDoc.getElementsByTagName("secuencia");
		
		aPreguntas = new Array();
		for(s=0;s<secuencias.length;s++)
		{
			var aPreg = new Array();
			aPreg["id"] = secuencias[s].attributes.getNamedItem("id").value;
			aPreg["idvideo"] = secuencias[s].attributes.getNamedItem("idvideo").value;
			aPreg["sInicio"] = secuencias[s].attributes.getNamedItem("sInicio").value;
			aPreg["sFin"] = secuencias[s].attributes.getNamedItem("sFin").value;
			aPreg["tipo"] = secuencias[s].attributes.getNamedItem("tipo").value;
			aPreg["obligatoria"] = secuencias[s].attributes.getNamedItem("obligatoria").value;
			aPreg["enunciado"] = secuencias[s].getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
			if(globalFeedback == 1)
			{
				if(secuencias[s].getElementsByTagName("feedBack")[0] != undefined)
				{
					if(secuencias[s].getElementsByTagName("feedBack")[0].childNodes[0] != undefined)
					{
						aPreg["feedBack"] = secuencias[s].getElementsByTagName("feedBack")[0].childNodes[0].nodeValue;
					}
					else
					{
						aPreg["feedBack"] = "";
					}
				}
				else
				{
					aPreg["feedBack"] = "";
				}
			}
			
			var aResps = new Array();
			respuestas = secuencias[s].getElementsByTagName("opcion");
			for(j=0;j<respuestas.length;j++)
			{
				var aResp = new Array();
				aResp["resp"] = respuestas[j].attributes.getNamedItem("resp").value;
				aResp["imagen"] = respuestas[j].attributes.getNamedItem("image").value;
				aResp["contenido"] = respuestas[j].childNodes[0].nodeValue;
				
				aResps[j] = aResp;
			}
			aPreg["respuestas"] = aResps;
			
			aPreguntas[s] = aPreg;
		}
		
		var idioma = xmlDoc.getElementsByTagName("idioma")[0];
		txtPuntos = idioma.getElementsByTagName("txtPuntos")[0].childNodes[0].nodeValue;
		txtTiempo = idioma.getElementsByTagName("txtTiempo")[0].childNodes[0].nodeValue;
		txtTiempoRestante = idioma.getElementsByTagName("txtTiempoRestante")[0].childNodes[0].nodeValue;
		
		txtTiempoSuperado = idioma.getElementsByTagName("txtTiempoSuperado")[0].childNodes[0].nodeValue;
		txtCerrar = idioma.getElementsByTagName("txtCerrar")[0].childNodes[0].nodeValue;
		txtTituloRespuestaCorrecta = idioma.getElementsByTagName("txtTituloRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtTituloActividadNoSuperada = idioma.getElementsByTagName("txtTituloActividadNoSuperada")[0].childNodes[0].nodeValue;
		txtTituloActividadSuperada = idioma.getElementsByTagName("txtTituloActividadSuperada")[0].childNodes[0].nodeValue;
		txtActividadSuperada = idioma.getElementsByTagName("txtActividadSuperada")[0].childNodes[0].nodeValue;
  		txtTituloRespuestaIncorrecta = idioma.getElementsByTagName("txtTituloRespuestaIncorrecta")[0].childNodes[0].nodeValue;
  		
		txtBoxRespuestaCorrecta = idioma.getElementsByTagName("txtBoxRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtActividadNoSuperada = idioma.getElementsByTagName("txtActividadNoSuperada")[0].childNodes[0].nodeValue;
		
		txtRespuestaCorrecta = idioma.getElementsByTagName("txtRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtRespuestaIncorrecta = idioma.getElementsByTagName("txtRespuestaIncorrecta")[0].childNodes[0].nodeValue;
		txtPosiblesRespuestas = idioma.getElementsByTagName("txtPosiblesRespuestas")[0].childNodes[0].nodeValue;
		
		txtAceptar = idioma.getElementsByTagName("txtAceptar")[0].childNodes[0].nodeValue;
		txtTiempoMaximo = idioma.getElementsByTagName("txtTiempoMaximo")[0].childNodes[0].nodeValue;
		txtSensible = idioma.getElementsByTagName("txtSensible")[0].childNodes[0].nodeValue;
		txtMayusculasMinusculas = idioma.getElementsByTagName("txtMayusculasMinusculas")[0].childNodes[0].nodeValue;
		txtAcentos = idioma.getElementsByTagName("txtAcentos")[0].childNodes[0].nodeValue;
		txtComenzar = idioma.getElementsByTagName("txtComenzar")[0].childNodes[0].nodeValue;
		txtAutor = idioma.getElementsByTagName("txtAutor")[0].childNodes[0].nodeValue;
		txtAyuda = idioma.getElementsByTagName("txtAyuda")[0].childNodes[0].nodeValue;
		txtMostrarMas = idioma.getElementsByTagName("txtMostrarMas")[0].childNodes[0].nodeValue;
		txtMostrarMenos = idioma.getElementsByTagName("txtMostrarMenos")[0].childNodes[0].nodeValue;
		txtReiniciar = idioma.getElementsByTagName("txtReiniciar")[0].childNodes[0].nodeValue;
		txtVolverJugar = idioma.getElementsByTagName("txtVolverJugar")[0].childNodes[0].nodeValue;
		txtResponder = idioma.getElementsByTagName("txtResponder")[0].childNodes[0].nodeValue;
		txtRegistrarse = idioma.getElementsByTagName("txtRegistrarse")[0].childNodes[0].nodeValue;
		txtAcceder = idioma.getElementsByTagName("txtAcceder")[0].childNodes[0].nodeValue;
		txtCompartirResultado = idioma.getElementsByTagName("txtCompartirResultado")[0].childNodes[0].nodeValue;
		txtPantallaCompleta = idioma.getElementsByTagName("txtPantallaCompleta")[0].childNodes[0].nodeValue;
		txtTuRespuesta = idioma.getElementsByTagName("txtTuRespuesta")[0].childNodes[0].nodeValue;
		txtInfoAdicional = idioma.getElementsByTagName("txtInfoAdicional")[0].childNodes[0].nodeValue;
		txtVolverAVer = idioma.getElementsByTagName("txtVolverAVer")[0].childNodes[0].nodeValue;
		txtSiguiente = idioma.getElementsByTagName("txtSiguiente")[0].childNodes[0].nodeValue;
		txtResponder = idioma.getElementsByTagName("txtResponder")[0].childNodes[0].nodeValue;
		txtTerminar = idioma.getElementsByTagName("txtTerminar")[0].childNodes[0].nodeValue;
		txtTuPuntuacionEs = idioma.getElementsByTagName("txtTuPuntuacionEs")[0].childNodes[0].nodeValue;
		txtMal = idioma.getElementsByTagName("txtMal")[0].childNodes[0].nodeValue;
		txtBien = idioma.getElementsByTagName("txtBien")[0].childNodes[0].nodeValue;
		txtVerCorregir = idioma.getElementsByTagName("txtVerCorregir")[0].childNodes[0].nodeValue;
		txtAnterior = idioma.getElementsByTagName("txtAnterior")[0].childNodes[0].nodeValue;
		nIntentos = "";
		txtImprimir = "";
		txtSocial = idioma.getElementsByTagName("txtSocial")[0].childNodes[0].nodeValue;
	}
	
//Inicializamos los diferentes elementos de nuestra aplicacion
	
	function inicializarElementos()
	{
	    //Inicializamos los colores de la aplicacion
		inicializarColores();
		//Inicializamos eventos principales
		inicializarEventosPrincipales();
		//Inicializamos los valores para la pantalla inicial
		inicializarPantallaInicial();
		//Inicializamos los parametros
		inicializarParametros();
		//Inicializamos el titulo de la propia aplicacion
		inicializarTituloAct();
		//Inicializamos la alerta correcta
		inicializarAlertaCorrecta();
		//Inicializar alerta incorrecta
		inicializarAlertaIncorrecta();
		//Inicializamos enlaces reinicio
		inicializarRecargar();
		//Inicializamos enlaces ayuda
		inicializarAyuda();
		//Inicializamos el registro
		inicializarRegistro();
	}

//Inicializamos los eventos principales

	function inicializarEventosPrincipales()
	{
		//Activamos la redimensión del crucigrama al cambiar el tamaño de la ventana 
		$(window).resize(function () {redimensionar();});
	}
