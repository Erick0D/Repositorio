//==========================================================================================================================
//Funciones que vamos a utilizar para inicializar elementos de nuestras aplicaciones (Comun para todas)
//==========================================================================================================================

//Inicializamos los colores personalizados de la aplicación

	function inicializarColores()
	{	
		//Con este valor cambiamos la diferencia de colores para el degradado - Botones
		var dif = 26;
		
		var color = colorBotones;
		var cant = parseInt(dif/2);
		var color1 = color.substring(0,2);
		var color2 = color.substring(2,4);
		var color3 = color.substring(4,6);
		
		if(hexadecimal_a_decimal(color1)+cant <= 255) var o1= hexadecimal_a_decimal(color1)+cant; else var o1= 255;
		if(hexadecimal_a_decimal(color2)+cant <= 255) var o2= hexadecimal_a_decimal(color2)+cant; else var o2= 255;
		if(hexadecimal_a_decimal(color3)+cant <= 255) var o3= hexadecimal_a_decimal(color3)+cant; else var o3= 255;
		
		var h1= decimal_a_hexadecimal(o1);
		var h2= decimal_a_hexadecimal(o2);
		var h3= decimal_a_hexadecimal(o3);
		
		colorBotonesC = h1+h2+h3;
		colorBotonesC = "#"+colorBotonesC;
			
		if(hexadecimal_a_decimal(color1)-cant >= 0) var o1= hexadecimal_a_decimal(color1)-cant; else var o1= 0;
		if(hexadecimal_a_decimal(color2)-cant >= 0) var o2= hexadecimal_a_decimal(color2)-cant; else var o2= 0;
		if(hexadecimal_a_decimal(color3)-cant >= 0) var o3= hexadecimal_a_decimal(color3)-cant; else var o3= 0;
		
		var h1= decimal_a_hexadecimal(o1);
		var h2= decimal_a_hexadecimal(o2);
		var h3= decimal_a_hexadecimal(o3);
		
		colorBotonesO = h1+h2+h3;
		colorBotonesO = "#"+colorBotonesO;
        
        //Con este valor cambiamos la diferencia de colores para el degradado - Fondo
		var dif = 26;
		
		var color = colorFondoInt;
		var cant = parseInt(dif/2);
		var color1 = color.substring(0,2);
		var color2 = color.substring(2,4);
		var color3 = color.substring(4,6);
		
		if(hexadecimal_a_decimal(color1)+cant <= 255) var o1= hexadecimal_a_decimal(color1)+cant; else var o1= 255;
		if(hexadecimal_a_decimal(color2)+cant <= 255) var o2= hexadecimal_a_decimal(color2)+cant; else var o2= 255;
		if(hexadecimal_a_decimal(color3)+cant <= 255) var o3= hexadecimal_a_decimal(color3)+cant; else var o3= 255;
		
		var h1= decimal_a_hexadecimal(o1);
		var h2= decimal_a_hexadecimal(o2);
		var h3= decimal_a_hexadecimal(o3);
		
		colorFondoC = h1+h2+h3;
		colorFondoC = "#"+colorFondoC;
			
		if(hexadecimal_a_decimal(color1)-cant >= 0) var o1= hexadecimal_a_decimal(color1)-cant; else var o1= 0;
		if(hexadecimal_a_decimal(color2)-cant >= 0) var o2= hexadecimal_a_decimal(color2)-cant; else var o2= 0;
		if(hexadecimal_a_decimal(color3)-cant >= 0) var o3= hexadecimal_a_decimal(color3)-cant; else var o3= 0;
		
		var h1= decimal_a_hexadecimal(o1);
		var h2= decimal_a_hexadecimal(o2);
		var h3= decimal_a_hexadecimal(o3);
		
		colorFondoO = h1+h2+h3;
		colorFondoO = "#"+colorFondoO;
	}
    
	function decimal_a_hexadecimal(i)
	{
  		if(i >= 0 && i <= 15){ hex = "0" + i.toString(16);}
  		else { hex = i.toString(16); }
  		return hex;
	}

	function hexadecimal_a_decimal(hex) 
	{	 
		return parseInt(hex,16); 
	}
    
//Inicializamos la pantalla principal y la ayuda
	
	function inicializarPantallaInicial()
	{
		$('#tituloInicio').html(enunciado);
        
        limpiarCaracteres();
		
		$('#descripcionInicio').html(descripcionUsuario);
        
		$('#inicioMas').text(txtMostrarMas);
		$('#inicioMenos').text(txtMostrarMenos);
		$('.expand').hide();
		$('.collapse').hide();
		inicializarEventosDescripcion();
		
		$('#btnComenzar').text(txtComenzar);
		$('#btnComenzarInicio a').click(function(e){e.preventDefault();entrarPantallaCompleta();comenzar();$('.logoPersonalizado').hide();$('.franjaPersonalizada').hide();});
	
		if (autor != '') {
			$('#inicioAutor').text(txtAutor+":");
			$('#autor').text(" "+autor);
		}
		$('#pantallaAyuda').text(descripcion);
		$('#textoAyuda').text(txtAyuda);
		$('#btnAceptar').text(txtAceptar);
		
		$('#cerrarPubli').click(function(e) {e.preventDefault();$('#banner').hide();});
        
        if(logoPersonalizado != "no" && logoPersonalizado != "")
        {
        		if(franjaPersonalizada != "no" && franjaPersonalizada != "")
        		{
        			$('.logoPersonalizado').addClass('lpf');
        		}
            $('.logoPersonalizado').show();
            $('#imgLogo').attr("src",rutaRecursos+logoPersonalizado);
        }
        
        if(franjaPersonalizada != "no" && franjaPersonalizada != "")
        {
            $('.franjaPersonalizada').show();
            $('#imgFranja').attr("src",rutaRecursos+franjaPersonalizada);
        }
        
        
        
	}
    
    function limpiarCaracteres(){
        if(descripcionUsuario.indexOf("&amp;#269;") > '0') try{descripcionUsuario = xmlDoc.getElementsByTagName("descripcionUsuarioLimpio")[0].childNodes[0].nodeValue;}catch(e){descripcionUsuario=xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;}
        if(descripcionUsuario.indexOf("&amp;#268;") > '0') try{descripcionUsuario = xmlDoc.getElementsByTagName("descripcionUsuarioLimpio")[0].childNodes[0].nodeValue;}catch(e){descripcionUsuario=xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;}
    }

//Inicializamos los eventos disponibles para la descripcion de pantalla de inicio
//Esta variable controla que cuando clickemos sobre 'mostrar más' no haga la redimension de la página y lo vuelva a cerrar
var redimension = 0;

	function inicializarEventosDescripcion()
	{
		$('.expand a').click(function(e) {
			e.preventDefault();
			redimension = 1;
			setTimeout(function(){redimension = 0;},1000);
	  		$('.expand').hide();
	  		$('.collapse').show();
	  		$('.descripcionActividad').css("height","auto");
		});

		$('.collapse a').click(function(e) {
			e.preventDefault();
	  		$('.expand').show();
	  		$('.collapse').hide();
	  		$('.descripcionActividad').css("height","70px");
		});
	}

//Cargamos y activamos la descripción inicial en función de su tamaño

	function cargarDescripcionInicio()
	{
		if(redimension == 0)
		{
			if($('#desAct').height() > 90)
			{
				$('#desAct').css("height","70px");
				$('.expand').show();
			}
			else
			{
				$('#desAct').css("height","auto");
				$('.expand').hide();
				$('.collapse').hide();
				if($('#desAct').height() > 90)
				{
					$('#desAct').css("height","70px");
					$('.expand').show();
				}
			}
		}
	}

//Inicializamos los parámetros necesarios
				
	function inicializarParametros()
	{
		inicializarPuntos();
		
		inicializarContadorTiempo();
		
		inicializarIntentos();
		
		inicializarOrtografia();
	}

//Inicializamos los puntos
	
	function inicializarPuntos()
	{
		$('#titPuntos').text(txtPuntos);
		$('#numPuntos').text('100');
	}

//Inicializamos el número de intentos
	
	function inicializarIntentos()
	{
		if((numero_intentos == 0)||(numero_intentos == "noDefinido"))
		{
			$('.intentos').hide();
			$('#datosCabecero').addClass('column2');
			$("#cajaIntentosInicio").hide();
		}
		else
		{
			$('#titIntentos').text(nIntentos);
			$('#numIntentos').html('0<sup>/'+numero_intentos+'</sup>');
			$('#inicioTitIntentos').text(nIntentos);
			$('#inicioIntentos').text(numero_intentos);
		}
	}		

//Inicializamos los temas de ortografía
	
	function inicializarOrtografia()
	{
		$('#inicioTitSensible').text(txtSensible+":");
		$('#inicioTitMay').text(txtMayusculasMinusculas);
		$('#inicioTitAcentos').text(txtAcentos);
		
		if(((sensible_mayusculas == "noDefinido")&&(sensible_acentos == "noDefinido")) || ((sensible_mayusculas_ocultar == "si") && (sensible_acentos_ocultar == "si")))
		{
			$('#inicioSensible').hide();
			if(($("#cajaIntentosInicio").css("display") == "none")&&($("#cajaTiempoInicio").css("display") == "none")) $('#infoPrimaria').hide();
		}
		else if((sensible_mayusculas == "noDefinido")&&(sensible_acentos == 'no'))
		{
			$('#inicioMay').addClass('falseSensible');
			$('#inicioAce').addClass('falseSensible');
		}
		else if((sensible_mayusculas == "noDefinido")&&(sensible_acentos == 'si'))
		{
			$('#inicioMay').addClass('falseSensible');
			$('#inicioAce').addClass('trueSensible');
		}
		else if((sensible_mayusculas == 'no')&&(sensible_acentos == "noDefinido"))
		{
			$('#inicioMay').addClass('falseSensible');
			$('#inicioAce').addClass('falseSensible');
		}
		else if((sensible_mayusculas == 'si')&&(sensible_acentos == "noDefinido"))
		{
			$('#inicioMay').addClass('trueSensible');
			$('#inicioAce').addClass('falseSensible');
		}
		else if((sensible_mayusculas == 'no')&&(sensible_acentos == 'no'))
		{
			$('#inicioMay').addClass('falseSensible');
			$('#inicioAce').addClass('falseSensible');
		}
		else if((sensible_mayusculas == 'no')&&(sensible_acentos == 'si'))
		{
			$('#inicioMay').addClass('falseSensible');
			$('#inicioAce').addClass('trueSensible');
		}
		else if((sensible_mayusculas == 'si')&&(sensible_acentos == 'no'))
		{
			$('#inicioMay').addClass('trueSensible');
			$('#inicioAce').addClass('falseSensible');
		}
		else if((sensible_mayusculas == 'si')&&(sensible_acentos == 'si'))
		{
			$('#inicioMay').addClass('trueSensible');
			$('#inicioAce').addClass('trueSensible');
		}
		if (sensible_mayusculas_ocultar == "si") {
			$('#inicioMay').hide();
		}
		if (sensible_acentos_ocultar == "si") {
			$('#inicioAce').hide();
		}
	}

//Inicializamos el contador de tiempo
	
	function inicializarContadorTiempo()
	{
		if(tiempo == 0)
		{
			$('#titTiempo').text(txtTiempo);
			$("#numTiempo").html("00:00");
			$("#cajaTiempoInicio").hide();
		}
		else
		{
			horas = parseInt(tiempo / 3600);
            if(horas >= 1)
            {
                minutos = parseInt((tiempo % 3600)/60);
                segundos = (tiempo % 3600) % 60;
            }
            else
            {
                horas = "";
                minutos = parseInt(tiempo / 60);
                segundos = tiempo % 60;
            } 
				
			if(segundos<10) segundos = "0"+segundos;
    		if(minutos<10) minutos = "0"+minutos;
            if(horas != "") if(horas<10) horas = "0"+horas;
				
			$('#titTiempo').text(txtTiempoRestante);
			if(horas == "") $("#numTiempo").html(minutos+":"+segundos);
            else $("#numTiempo").html(horas+":"+minutos+":"+segundos);
			
            if(horas == "")tiempoReg = minutos+":"+segundos;
			else tiempoReg = horas+":"+minutos+":"+segundos;
            
            $("#inicioTitTiempo").text(txtTiempoMaximo);
			
            if(horas == "") $("#inicioTiempo").html(minutos+":"+segundos);
            else $("#inicioTiempo").html(horas+":"+minutos+":"+segundos);
		}
	}

//Inicializamos el título de la actividad
	
	function inicializarTituloAct()
	{
		var esGAM = false;
		try{
			if (xmlDoc.getElementsByTagName("gam")[0].childNodes[0].nodeValue == 'si') {
				esGAM = true;
			}
		}catch(e){
		}
		if ((window == window.top) && (!esGAM))
		{
			$('#enlaceTitAct').html(enunciado);
		}
		else
		{
			$('#tituloAct').html(enunciado);
		}
	}

//Inicializamos la parte superior de la pantalla final para un caso correcto
	
	function inicializarAlertaCorrecta()
	{
		$('#textoCorrecto').text(txtBoxRespuestaCorrecta);
		$('#tituloCorrecto').text(enunciado);
	}

//Inicializamos la parte superior de la pantalla final para un caso incorrecto
	
	function inicializarAlertaIncorrecta()
	{
		$('#tituloMAL').text(enunciado);
	}

//Inicializamos la recarga de la aplicación
	
	function inicializarRecargar()
 	{
 		if(ocultar_reiniciar == '1')
    {
        $("#btnReiniciar").remove();
        $("#tooltipR").remove();
        $("#enlaceReiniciar").remove();
    }
    else
    {
		 		$("#btnReiniciar").text(txtVolverJugar);
		 		$("#btnReiniciar").click(function(e){
					e.preventDefault();
					try{
						parent.recargaActividad();
					}catch(error){
					}
					location.reload();
				});
		 		$("#tooltipR").html(txtReiniciar);
		 		$("#enlaceReiniciar").click(function(e){
					e.preventDefault();
					try{
						parent.recargaActividad();
					}catch(error){
					}
					location.reload();
				});
		}
 	}

//Inicializamos las opciones de ayuda de la aplicacion
 	
 	function inicializarAyuda()
	{
		if (descripcion == '') {
			$(".ayuda").hide();
		}
 		$("#btnAyuda").attr("title",txtAyuda);
 		$("#tooltipA").html(txtAyuda);
 		
 		$("#tooltipPC").html(txtPantallaCompleta);
 		$("#tooltipI").html(txtImprimir);
 		
		 $("#enlaceImprimirP").attr("title",txtImprimir);

		 $("#enlacePantallaCompletaP").attr("title",txtPantallaCompleta);
		 
		switch ($(document).data("environment")) {
		case 'lti':
		case 'gclassroom':
		case 'challenge':
			$("#enlaceImprimirP").hide();
			$("#enlacePantallaCompletaP").hide();
			$("#enlaceImprimir").hide();
			$("#enlacePantallaCompleta").hide();
			$("#enlaceReiniciar").hide();
			break;
		}	
 	
		$('.ayuda').click(function(e) {
			e.preventDefault();
			$('#help').removeClass('oculto');
			$('#shadowHelp').removeClass('oculto');
		
			$('#help').addClass('visible');
			$('#shadowHelp').addClass('visible');
	 	});
	 
	 	$('#help a').click(function(e) {
	 		e.preventDefault();
			$('#help').addClass('oculto');
			$('#shadowHelp').addClass('oculto');
		
			$('#help').removeClass('visible');
			$('#shadowHelp').removeClass('visible');
	 	});
 	}
 	
//Inicializamos los parametros del Zoom

	function inicializarZoom()
	{
		$("#zoomUp").attr("title",txtAumentar);
		$("#zoomDown").attr("title",txtReducir);
		$("#encajarEnPantalla").attr("title","100%");
		$("#zoomUp").click(function(e){e.preventDefault();redimensionar("up");});
		$("#encajarEnPantalla").click(function(e){e.preventDefault();redimensionar("encaja");});
		$("#zoomDown").click(function(e){e.preventDefault();redimensionar("down");});
		$("#infoZoom").hide();
	}