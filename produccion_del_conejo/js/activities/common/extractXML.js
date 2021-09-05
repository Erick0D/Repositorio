//==========================================================================================================================
//Funciones que vamos a utilizar para extraer los datos para nuestra aplicacion desde el XML (Comun para todas)
//==========================================================================================================================
var origenXML="";
var rutaRecursosInicio="";
//No aplicamos esto para versiones de Android menores de 3.0
if((navigator.userAgent.match(/android 1/i))||(navigator.userAgent.match(/android 2/i))||(navigator.userAgent.match(/android 3/i))||(navigator.userAgent.match(/honeycomb/i))){}
else $('html').css("overflow-x","hidden");
		
//Ejecutamos lo siguiente al cargar la página 

	window.onload = function(){
	 	
        //Quitamos la marca de agua de Educaplay si son actividades de usuario con cuenta commercial
        if($(document).data("PRMO") == '3'){
            $(".mEduca").remove();
            setTimeout(function(){ $('#contentPreActividad').show(); },200);
            $("#btnEducaplayB").hide();
            $("#btnEducaplayA,#btnEducaplayB").hide();
        }
        
	 	if((navigator.userAgent.match(/android 1/i))||(navigator.userAgent.match(/android 2/i))){$("body").addClass("android");}
	 	
	 	rutaRecursos="/actividades/"+$(document).data("idActividad")+"/";rutaRecursosDownl="";
        rutaRecursosInicio = rutaRecursos;
	 	//rutaRecursos = "";
		
		 /*
        if($(document).data("publi") == 0)
		{
            //Cargamos el pub por temas de configuración
            cargarXMLDoc(rutaRecursos+"pub.xml");
		}
		*/
	 	
	 	//Si no esta en un iframe quitamos boton pantalla completa
	 	$("#enlaceEducaplay").hide();
	 	//Comprobamos si estamos en Educaplay o no
	 	try{
	 		var parLoc = window.top.location;
	 		var cad = /.educaplay.com/;
	 		var dentro = cad.test(parLoc);
            if(dentro)
            {
			 		    var cad1 = /grupos/;
							var cad2 = /groups/;
							var cad3 = /groupes/;
							if ((cad1.test(parLoc)) || (cad2.test(parLoc)) || (cad3.test(parLoc))) {
								dentro = false;
							} else {
								dentro = true;
							}
            }
	 	}
	 	catch(e){
	 		var dentro = false;
	 	}
	 	
		if(window == window.top)
		{
			$("#enlacePantallaCompleta").hide();
			$("#enlacePantallaCompletaP").hide();
			$("#enlaceEducaplay").show();
			
			if($(".groupColeccion").length)
			{
				$(".groupColeccion").show();
				var numActual = parseInt($("#actualCarousel").attr("data-orden"))-1;
				var limite = $("#mycarousel li").length;
				if(numActual >= limite-4) numActual = limite;
				jQuery('#mycarousel').jcarousel({start:numActual});
				$('.contentToggleBar').hide();
				$('.capsulaActividad').css('top','27px');
				$('.btnToggleColeccion2').click(function(e) {
					e.preventDefault();
					if($('.capsulaActividad').css('top') == '27px') {$('.capsulaActividad').animate({ top:'152px' },800);$(this).addClass("active");}
					else {$('.capsulaActividad').animate({ top:'27px' },800);$(this).removeClass("active");}
					$('.contentToggleBar').slideToggle(800,"swing", function () {});
				});
				$(".btnNav2").bind("click",function(e){
					e.preventDefault();
					if($(".carruselenlace"+$(this).data('enl')).length)
					{
						window.location.href = $(".carruselenlace"+$(this).data('enl')).attr("href");
					}
				});
			}
		}
		else if(!dentro)
		{
			if($(".groupColeccion").length)
			{
				$(".groupColeccion").show();
				var numActual = parseInt($("#actualCarousel").attr("data-orden"))-1;
				var limite = $("#mycarousel li").length;
				if(numActual >= limite-4) numActual = limite;
				jQuery('#mycarousel').jcarousel({start:numActual});
				$('.contentToggleBar').hide();
				$('.capsulaActividad').css('top','27px');
				$('.btnToggleColeccion2').click(function(e) {
					e.preventDefault();
					if($('.capsulaActividad').css('top') == '27px') {$('.capsulaActividad').animate({ top:'152px' },800);$(this).addClass("active");}
					else {$('.capsulaActividad').animate({ top:'27px' },800);$(this).removeClass("active");}
					$('.contentToggleBar').slideToggle(800,"swing", function () {});
				});
				$(".btnNav2").bind("click",function(e){
					e.preventDefault();
					if($(".carruselenlace"+$(this).data('enl')).length)
					{
						window.location.href = $(".carruselenlace"+$(this).data('enl')).attr("href");
					}
				});
			}
		}
		else
		{
			if($(".groupColeccion").length)
			{
				$('body').html($(".capsulaActividad").html());
				$(".capsulaActividad").remove();
			}
		}
        
		$("#btnEducaplayA").hide();
		$("#btnEducaplayB").hide();
		$('#preLoad').hide();
		$('#contentPreActividad').show();
		cargarDescripcionInicio();
		//Cargamos los datos necesarios desde el XML
		cargarDatos();
	}

//Carga los datos necesarios desde el fichero XML de la actividad
  
    function cargarDatos()
	{
		origenXML= rutaRecursos;
		
		xmlDoc = cargarXMLJS();
		if ((xmlDoc != null)&&(xmlDoc != undefined))
		{
			//Extraemos los datos del XML, si hay error en la lectura del fichero lo comunicamos
			try{extraerDatos();}
			catch(e){
			 
				errorXML();
				}
			
			//Inicializamos los elementos comunes de la aplicacion
			inicializarElementos();
			//Creamos la aplicacion
			crear();
		}
		else
		{
			errorXML();
		}				
	}
	
//Resgistra el error cuando no se puede leer el XML

	function errorXML()
	{
		try{
	 		var parLoc = window.top.location;
	 		var cad = /.educaplay.com/;
	 		var dentro = cad.test(parLoc);
            if(dentro)
            {
			 		    var cad1 = /grupos/;
							var cad2 = /groups/;
							var cad3 = /groupes/;
							if ((cad1.test(parLoc)) || (cad2.test(parLoc)) || (cad3.test(parLoc))) {
								dentro = false;
							} else {
								dentro = true;
							}
            }
	 	}
	 	catch(e){
	 		var dentro = false;
	 	}
        
        if(dentro) $.get("/avisoEstructuraXml.php");
		$("#preActividad").append("<div id='errorXML'>"+$(document).data("loadingXmlError")+"</div>");
		$("#contentPreActividad").addClass("superError");
		$("#cerrarPubli").click(function(e){e.preventDefault();$("#banner").hide();});
	}
				
//Carga el fichero XML
/*	
	function cargarXMLDoc(archivoXML) 
	{
 		var xmlDoc=undefined;
		try
		{
			if (document.all) //IE
			{
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			}
			else //FIREFOX,OPERA_SERVIDOR
			{
				xmlDoc = document.implementation.createDocument("","",null);
			}
			xmlDoc.async=false;
			xmlDoc.load(archivoXML);
		}
		catch(e)
		{
			try 
			{ //SAFARI,CHROME_SERVIDOR
               	var xmlhttp = new window.XMLHttpRequest();
               	xmlhttp.open("GET",archivoXML,false);
               	xmlhttp.send(null);
              	xmlDoc = xmlhttp.responseXML.documentElement;
				return xmlDoc;
			} 
			catch (e) 
			{
				return undefined;
			}
		}
		return xmlDoc;
	}
	*/
	function cargarXMLJS() {
		return jQuery.parseXML(DatosActividad);
	}