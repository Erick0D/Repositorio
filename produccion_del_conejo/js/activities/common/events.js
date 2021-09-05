//==========================================================================================================================
//Funciones que vamos a utilizar cuando el usuario comienza a interactuar con la aplicacion (Comun para todas) 
//==========================================================================================================================

//Procesado del feedback para crear enlaces html
	
	function preg_replace(pattern,replacement,subject,limit){
		if(typeof limit == "undefined") limit=-1;
		if(subject.match(eval(pattern)))
		{
			if(limit == -1)
			{ //no limit
				return subject.replace(eval(pattern + "g"), replacement);
			}
			else
			{
				for(x=0;x<limit;x++)
				{
					subject=subject.replace(eval(pattern),replacement);
				}
				return subject;
			}
		}else{
			return subject;
		}
	}
	
	function libLinkCreator(string,params)
	{
		var target="";
		var replaceLinkText="";

		if(params.target){
			target=params.target;
		}
		
		if(params.linkReplace){
			replaceLinkText=params.linkReplace;
		}
		
		if (string=='')	{
			return;
		}
		
		if(target!=''){
		   target=' target="'+target+'"';
		}
		url=string.match(/\b(https?|ftp|file):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]/g);
		replaceLinkText=(replaceLinkText!='')?replaceLinkText:url;
		return string.replace(url, '<a'+target+' href="'+url+'">'+replaceLinkText+'</a>');
	}

//Comprobamos si el dispositivo es táctil o no

	function is_touch_device() 
	{
		var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		return supportsTouch;
  		//return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
	};
	
//Comprobamos si es Safari de PC

	function safariPC()
	{
		if((navigator.userAgent.toLowerCase().indexOf('safari/') != -1)&&(navigator.appVersion.indexOf("Win") != -1)&&(navigator.userAgent.toLowerCase().indexOf('chrome/') == -1))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
   	
//Contador de tiempo
var tiempoReg = "00:00";

    function contador()
    {
    	var posicion = 0;
    	var actual = tiempoReg;
    	
    	for(i=0;i<actual.length;i++)
    	{
    		if(actual.charAt(i) == ":")
    		{
    			posicion = i;
    			break;
    		}
    	}
    	
        if(actual.length > 5)
        {
            var horas = parseInt(actual.substring(0,posicion),10);
            var minutos = parseInt(actual.substring(posicion+1,posicion+3),10);
            var segundos = parseInt(actual.substring(posicion+4,posicion+6),10);
            
            if(tiempo == 0)
            {
     			if(segundos != 59){segundos += 1;}
            	else if(minutos != 59){minutos +=1;segundos = 0;}
                else {horas +=1;minutos = 0;segundos = 0;}
     		}
     		else
     		{
     			if(segundos != 0){segundos -= 1;}
            	else if(minutos != 0) {minutos -=1;segundos = 59;}
                else {horas -=1;minutos = 59;segundos = 59;}
     		}
            
            if(segundos<10) segundos = "0"+segundos;
            if(minutos<10) minutos = "0"+minutos;
            if(horas<10) horas = "0"+horas;
            tiempoReg = horas+":"+minutos+":"+segundos;
            $("#numTiempo").html(horas+":"+minutos+":"+segundos);
            
            if((horas==0)&&(minutos==0)&&(segundos==10)&&(tiempo!=0))
            {
            	$('#cajaTiempo').addClass('alertLuz');
       		}
            
            if((horas==0)&&(minutos==0)&&(segundos==0))
            {
            	if(tipo_actividad == "Mapa") numero_intentos = 0;
            	if((tipo_actividad == "OLetras")||(tipo_actividad == "OPalabras")||(tipo_actividad == "Crucigrama")) $('#btnComprobar').unbind("click");
            	if(tipo_actividad == "Dictado") corregir("tiempo");
                if(tipo_actividad == "Crucigrama") corregir("fin");
            	
            	if(tipo_actividad == "Test") {
					$('#btnFinalizar').unbind("click"); cargarProgreso(); corregir("final");
				} else {
					cargarPantallaFinal('tiempo',getDatosRespuestas(0));
				}
       		}
        }
        else
        {
            var minutos = parseInt(actual.substring(0,posicion),10);
            if(minutos == 60) {tiempoReg = "01:00:00";contador();}else{
            var segundos = parseInt(actual.substring(posicion+1,posicion+3),10);
            
            if(tiempo == 0)
     		{
     			if(segundos != 59){segundos += 1;}
            	else {minutos +=1;segundos = 0;}
     		}
     		else
     		{
     			if(segundos != 0){segundos -= 1;}
            	else {minutos -=1;segundos = 59;}
     		}
            
            if(segundos<10) segundos = "0"+segundos;
            if(minutos<10) minutos = "0"+minutos;
            tiempoReg = minutos+":"+segundos;
            $("#numTiempo").html(minutos+":"+segundos);
            
            if((minutos==0)&&(segundos==10)&&(tiempo!=0))
            {
            	$('#cajaTiempo').addClass('alertLuz');
       		}
            
            if((minutos==0)&&(segundos==0))
            {
            	if(tipo_actividad == "Mapa") numero_intentos = 0;
            	if((tipo_actividad == "OLetras")||(tipo_actividad == "OPalabras")||(tipo_actividad == "Crucigrama")) $('#btnComprobar').unbind("click");
            	if(tipo_actividad == "Dictado") corregir("tiempo");
                if(tipo_actividad == "Crucigrama") corregir("fin");
            	
            	if(tipo_actividad == "Test") {
					$('#btnFinalizar').unbind("click"); cargarProgreso(); corregir("final");
				} else {
					cargarPantallaFinal('tiempo',getDatosRespuestas(0));
				}
       		}}
        }
 	}
   	  
//Cargamos la pantalla final en función de si es correcta o incorrecta

    function cargarPantallaFinal(tipoAlerta,datos)
    {
		salirPantallaCompleta();

		if (ocultar_redes == '1') {
			$("#shareResultado").remove();
		}

		//Variable para registro, para saber cuando termina aplicacion
		finalizado=1;
        finOK=1;
        if ((tipoAlerta == "tiempo")||(tipoAlerta == "intentos")||(tipoAlerta == "noSuperada")) finOK=0;
		
		clearInterval(idInterval);
    	$('#shadow').hide();
    	if(document.getElementById('pistaAudio') != null) document.getElementById('pistaAudio').pause();
    	var audio = document.getElementById("audio_0");
		if(audio != null)
		{
			$('#iconoAudio').removeClass("pPause");
			$('#iconoAudio').addClass("pPlay");
			audio.pause();
			clearTimeout(timeoutCanvas);
		}
        
        $('#finalCompartir').text(txtCompartirResultado+":");
        $('#finalAcceder').text(txtAcceder);
		$('#finalRegistrarse').text(txtRegistrarse);
		actualizaPuntosFinal(tipoAlerta);
		if((numero_intentos == 0)||(numero_intentos == "noDefinido"))
		{
			$("#valorPuntos").html(puntosReg);
			if(tiempo == 0)
			{
				$("#valorTiempo").html(tiempoReg);
			}
			else
			{
				var posicionTiempo = 0;
    			var tiempoFinalRestante = tiempoReg;
    			for(i=0;i<tiempoFinalRestante.length;i++)
    			{
    				if(tiempoFinalRestante.charAt(i) == ":")
    				{
    					posicion = i;
    					break;
    				}
    			}
        		if(tiempoFinalRestante.length > 5)
                {
                    var horasRestantes = parseInt(tiempoFinalRestante.substring(0,posicion),10);
            		var minutosRestantes = parseInt(tiempoFinalRestante.substring(posicion+1,posicion+3),10);
                    var segundosRestantes = parseInt(tiempoFinalRestante.substring(posicion+4,posicion+6),10);
            		tiempoFinalRestante = segundosRestantes + minutosRestantes*60 + horasRestantes*3600;
            		var tiempoEmpleado = tiempo - tiempoFinalRestante;
            		
                    horasEmpleadas = parseInt(tiempoEmpleado / 3600);
    				minutosEmpleados = parseInt((tiempoEmpleado % 3600) / 60);
    				segundosEmpleados = (tiempoEmpleado % 3600) % 60;
    				
    				if(segundosEmpleados<10) segundosEmpleados = "0"+segundosEmpleados;
        			if(minutosEmpleados<10) minutosEmpleados = "0"+minutosEmpleados;
                    if(horasEmpleadas<10) horasEmpleadas = "0"+horasEmpleadas;
    				
    				tiempoReg = horasEmpleadas+":"+minutosEmpleados+":"+segundosEmpleados;
    				$("#valorTiempo").html(horasEmpleadas+":"+minutosEmpleados+":"+segundosEmpleados);
                }
                else
                {
                    var minutosRestantes = parseInt(tiempoFinalRestante.substring(0,posicion),10);
            		var segundosRestantes = parseInt(tiempoFinalRestante.substring(posicion+1,posicion+3),10);
            		tiempoFinalRestante = segundosRestantes + minutosRestantes*60;
            		var tiempoEmpleado = tiempo - tiempoFinalRestante;
            		
    				minutosEmpleados = parseInt(tiempoEmpleado / 60);
    				segundosEmpleados = tiempoEmpleado % 60;
    				
    				if(segundosEmpleados<10) segundosEmpleados = "0"+segundosEmpleados;
        			if(minutosEmpleados<10) minutosEmpleados = "0"+minutosEmpleados;
    				
    				tiempoReg = minutosEmpleados+":"+segundosEmpleados;
    				$("#valorTiempo").html(minutosEmpleados+":"+segundosEmpleados);
                }	
			}
			$("#finalTitTiempo2").html(txtTiempo);
    		$("#finalTitPuntos2").html(txtPuntos);
    		$('.col3').hide();
    		$('.col2').show();
		}
		else
		{
			$("#valorPuntosI").html(puntosReg);
			if(tiempo == 0)
			{
				$("#valorTiempoI").html(tiempoReg);
			}
			else
			{
				var posicionTiempo = 0;
    			var tiempoFinalRestante = tiempoReg;
    			for(i=0;i<tiempoFinalRestante.length;i++)
    			{
    				if(tiempoFinalRestante.charAt(i) == ":")
    				{
    					posicion = i;
    					break;
    				}
    			}
        		if(tiempoFinalRestante.length > 5)
                {
               	    var horasRestantes = parseInt(tiempoFinalRestante.substring(0,posicion),10);
            		var minutosRestantes = parseInt(tiempoFinalRestante.substring(posicion+1,posicion+3),10);
                    var segundosRestantes = parseInt(tiempoFinalRestante.substring(posicion+4,posicion+6),10);
            		tiempoFinalRestante = segundosRestantes + minutosRestantes*60 + horasRestantes*3600;
            		var tiempoEmpleado = tiempo - tiempoFinalRestante;
            		
                    horasEmpleadas = parseInt(tiempoEmpleado / 3600);
    				minutosEmpleados = parseInt((tiempoEmpleado % 3600) / 60);
    				segundosEmpleados = (tiempoEmpleado % 3600) % 60;
    				
    				if(segundosEmpleados<10) segundosEmpleados = "0"+segundosEmpleados;
        			if(minutosEmpleados<10) minutosEmpleados = "0"+minutosEmpleados;
                    if(horasEmpleadas<10) horasEmpleadas = "0"+horasEmpleadas;
    				
    				tiempoReg = horasEmpleadas+":"+minutosEmpleados+":"+segundosEmpleados;
    				$("#valorTiempoI").html(horasEmpleadas+":"+minutosEmpleados+":"+segundosEmpleados);
                }
                else
                {
                	var minutosRestantes = parseInt(tiempoFinalRestante.substring(0,posicion),10);
            		var segundosRestantes = parseInt(tiempoFinalRestante.substring(posicion+1,posicion+3),10);
            		tiempoFinalRestante = segundosRestantes + minutosRestantes*60;
            		var tiempoEmpleado = tiempo - tiempoFinalRestante;
            		
            		minutosEmpleados = parseInt(tiempoEmpleado / 60);
    				segundosEmpleados = tiempoEmpleado % 60;
    				
    				if(segundosEmpleados<10) segundosEmpleados = "0"+segundosEmpleados;
        			if(minutosEmpleados<10) minutosEmpleados = "0"+minutosEmpleados;
    				
    				tiempoReg = minutosEmpleados+":"+segundosEmpleados; 
    				$("#valorTiempoI").html(minutosEmpleados+":"+segundosEmpleados);
                }
			}
			$("#finalTitTiempo3").html(txtTiempo);
    		$("#finalTitPuntos3").html(txtPuntos);
    		var cIntentos = $('#numIntentos').text();
			var posI = cIntentos.indexOf("/");
			var intento = 0;
			if(tipoAlerta == 'OK') {
				if (typeof(ACT_SUMARINTENTOSFINAL) == 'undefined') {
					intento = 1;
				} else {
					intento = ACT_SUMARINTENTOSFINAL;
				}
			}
			var utilizados = (parseInt(cIntentos.substring(0,posI+1)))+intento+" <sup>/"+numero_intentos+"</sup";
    		$("#valorIntentos").html(utilizados);
    		$('#finalTitIntentos3').text(nIntentos);
    		$('.col2').hide();
    		$('.col3').show();
		}
		setTimeout(function(){
			$('#contentPreActividad').hide();
			$('#contentAct').hide();
			$('#resumen').show();
			if ($("#valoraciones").attr('data-url') != null) {
				$("#valoraciones--estrellas").rateYo({
					rating: 0,
					ratedFill: "#6eb118",
					fullStar: true,
					starWidth: "50px"
				});
				$("#valoraciones--estrellas").rateYo().on("rateyo.set", function (e, data) {
					urlREST = $("#valoraciones").attr('data-url') + '?token=' + $(document).data("tokenID");
					$.ajaxSetup({
						beforeSend: function (xhr)
						{
						
						}
					});
					$.ajax({
						url: urlREST,
						method: 'PUT',
						data: {
							rating: data.rating
						},
					});
					$("#valoraciones").hide();
				});
			}
		},1000);
		if (ocultar_respuestas == '1') {
			$('.groupInfoPlayer').css("width","100%");
			$('.groupInfoRespuestas').hide();
		} else {
			completarPantallaFinal();
		}
		if(tipoAlerta == "OK")
		{
			$('.actNoSuperada').hide();
			$('.actSuperada').show();
			if (texto_final != '') {
				$('#textoFinal').html(texto_final);
				$('#textoFinal').addClass('textoFinalDisplayed');
			}
		}
		else if((tipoAlerta == "tiempo")||(tipoAlerta == "intentos")||(tipoAlerta == 'noSuperada'))
		{
			$('.actNoSuperada').show();
			$('.actSuperada').hide();
			if(tipoAlerta == 'tiempo')
			{
				$('#textoMAL').text(txtTiempoSuperado);
				$('#cajaTiempoFinal').addClass('falloResultado');
			}
			if(tipoAlerta == 'intentos')
			{
				$('#textoMAL').text(txtSuperadoNumeroIntentos);
				$('#cajaIntentosFinal').addClass('falloResultado');
			}
			if(tipoAlerta == 'noSuperada')
			{
				$('#textoMAL').text(txtActividadNoSuperada.substring(0,txtActividadNoSuperada.length-1));
				$('#cajaIntentosFinal').addClass('falloResultado');
			}
		}
		//Enviar puntuacion obtenida, tiempo y puntos
		var posicion = 0;
		
		tiempoFinal = tiempoReg;
    	
    	for(i=0;i<tiempoFinal.length;i++)
    	{
    		if(tiempoFinal.charAt(i) == ":")
    		{
    			posicion = i;
    			break;
    		}
    	}
        
        if(tiempoFinal.length > 5)
        {
            var horas = parseInt(tiempoFinal.substring(0,posicion),10);
            var minutos = parseInt(tiempoFinal.substring(posicion+1,posicion+3),10);
            var segundos = parseInt(tiempoFinal.substring(posicion+4,posicion+6),10);
            tiempoFinal = segundos + minutos*60 + horas*3600;  
        }
        else
        {
            var minutos = parseInt(tiempoFinal.substring(0,posicion),10);
            var segundos = parseInt(tiempoFinal.substring(posicion+1,posicion+3),10);
            tiempoFinal = segundos + minutos*60;   
        }
		
		setRegistroPuntuacion(puntosReg);
		setRegistroTiempo(tiempoFinal);
		finalizar(datos);
		if(function_exists ('showRelatedResources')){
			try
			{
				showRelatedResources();
			}
			catch(err)
			{
				//Handle errors here
			}			
		}
    }

	function function_exists (func_name) {
		if (typeof func_name === 'string') {
			func_name = this.window[func_name];
		}
		return typeof func_name === 'function';
	}

//Funcion que asigna el scroll al elemento 'scroller' para dispositivos táctiles

	function loaded() {
		myScroll = setTimeout(function(){new iScroll('wrapper', { zoom:true })},8000);
	}

//Funciones para hacer el zoom con la ruleta del ratón

	function handle(delta) {
		if (delta < 0) redimensionar('down');
    	else redimensionar('up');
	}

	function wheel(event){
		var delta = 0;
    	if (!event) event = window.event;
   		if (event.wheelDelta) delta = event.wheelDelta/120;
   		else if (event.detail) delta = -event.detail/3;
    
    	if (delta) handle(delta);
    	if (event.preventDefault) event.preventDefault();
	
		event.returnValue = false;
	}		

//Funciones para el registro en base de datos de los datos obtenidos
	
	function inicializarRegistro(){
		if (registro.getElementsByTagName("tipo")[0].childNodes[0].nodeValue == "scorm"){
			inicializarRegistroScorm();
		}
	}
	
	function inicializarRegistroScorm(){
		try{
			inicializadoScorm=adrInicializar();
			if(inicializadoScorm)
			{
				adrSetValue("tiempo",0);
				var estado=adrComprobarEstado();
				if(!estado)
				{
					adrSetValue("minimo",0);
					adrSetValue("maximo",100);
					adrSetValue("resultado",0);
					adrSetValue("estado","noFinalizado");
				}
				adrCommit();
			}
		}catch(error){
			inicializadoScorm=false;
		}
		return;	
	
	}
	
	function setRegistroPuntuacion(n){
		registroPuntuacion=n;
	}
	
	function setRegistroTiempo(t){
		registroTiempo=t;
	}
	
	function finalizar(datos){
		if (registro.getElementsByTagName("tipo")[0].childNodes[0].nodeValue == "scorm"){
			_finalizarSCORM();
		}else if (registro.getElementsByTagName("tipo")[0].childNodes[0].nodeValue == "script"){
			_finalizarScript(datos);
		}
		try{
			parent.finActividad();
		}catch(error){
		
		}
	}
	
	var registroRealizado;
	
	function _finalizarSCORM(){
		var estado=false;
		var commitScorm=false;
		var finalizadoScorm=false;
		var aux;
		if(!registroRealizado){
			if(inicializadoScorm){
				aux=_getValor('TIME');
				adrSetValue("tiempo",aux*1000);
				estado=adrComprobarEstado();
				//Compruebo si la actividad ya se ha registrado
				if(!estado){
					//Compruebo si el alumno ha finalizado o no la actividad
					if(finalizado){
					   if(finOK == 1)
                       {
                            adrSetValue("estado","finalizadoOK");
                       }
                       else
                       {
                            adrSetValue("estado","finalizadoERROR");
                       }
					}else{
						adrSetValue("estado","noFinalizado");
					}
					adrSetValue("resultado",_getValor('SCORE'));
				}
				commitScorm=adrCommit();
				finalizadoScorm=adrFinalizar();
				//Compruebo que el registro se ha realizado de forma correcta
				if((commitScorm)&&(finalizadoScorm)){
					registroRealizado=true;
				}
			}
		}
	}
	
	function _finalizarScript(datos){
		var i=0;
		var variables = {};
		parametrosReg=registro.getElementsByTagName("parametros")[0];
		var aux="";
		if (registroRealizado){
			return;
		}
		variables['action'] = 'activityFinished';
		for(i=0;i<parametrosReg.getElementsByTagName("parametro").length;i++){
			variables[parametrosReg.getElementsByTagName("parametro")[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue]= _getValor(parametrosReg.getElementsByTagName("parametro")[i].getElementsByTagName("valor")[0].childNodes[0].nodeValue); 
		}
		registroURL=registro.getElementsByTagName("url")[0].childNodes[0].nodeValue;
		forcedSESSID = $(document).data("sessid")
		if (forcedSESSID != '') {
			registroURL += '?sessid=' + forcedSESSID;
		}
		variables['token'] = registro.getElementsByTagName("token")[0].childNodes[0].nodeValue;
		var codigo = "score="+variables["score"]+"&time="+variables["time"]+"&token="+variables['token']+"G7GtgTT";
		variables['tokenSignature'] = calcMD5(codigo);
		variables['data'] = JSON.stringify(datos);
		if ($(document).data("environment") != '') {
			variables['environment'] = $(document).data("environment");
			variables['state'] = $(document).data("state");
			variables['signature'] = $(document).data("signature");
			if ($(document).data("environment") == 'lti') {
				variables['oauth_consumer_key'] = $(document).data("oauth_consumer_key");
				variables['lis_outcome_service_url'] = $(document).data("lis_outcome_service_url");
				variables['lis_result_sourcedid'] = $(document).data("lis_result_sourcedid");
				variables['lti_nickname'] = $(document).data("lti_nickname");
				variables['lti_token'] = $(document).data("lti_token");
			}
		}
        $.ajax({
			type: "POST",
			url: registroURL,
			data: variables,
			cache: false, 
			success: function(){
				registroRealizado=true;
				return;
			}
		});
	}
	
	function _getValor(nombre)
	{
		var aux="";
		switch(nombre)
		{
			case "SCORE":
				aux=registroPuntuacion;
				break;
			case "TIME":
				aux=registroTiempo;
				break;
			case "URL":
				aux=document.location.href;
				break;
		}
		return aux;
	}	

 
//********************************************************************************
//********************************************************************************
 
var sAscii = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
var sAscii = sAscii + "[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"; 

var sHex = "0123456789ABCDEF"; 
function hex2(i) 
{ 
  h = ""; 
  for(j = 0; j <= 3; j++) 
  { 
    h += sHex.charAt((i >> (j * 8 + 4)) & 0x0F) + 
         sHex.charAt((i >> (j * 8)) & 0x0F); 
  } 
  return h; 
} 

function add(x, y) 
{ 
  return ((x&0x7FFFFFFF) + (y&0x7FFFFFFF)) ^ (x&0x80000000) ^ (y&0x80000000); 
} 


function R1(A, B, C, D, X, S, T) 
{ 
  q = add(add(A, (B & C) | ((~B) & D)), add(X, T)); 
  return add((q << S) | (q >>> (32 - S)), B); 
} 

function R2(A, B, C, D, X, S, T) 
{ 
  q = add(add(A, (B & D) | (C & (~D))), add(X, T)); 
  return add((q << S) | (q >>> (32 - S)), B); 
} 

function R3(A, B, C, D, X, S, T) 
{ 
  q = add(add(A, B ^ C ^ D), add(X, T)); 
  return add((q << S) | (q >>> (32 - S)), B); 
} 

function R4(A, B, C, D, X, S, T) 
{ 
  q = add(add(A, C ^ (B | (~D))), add(X, T)); 
  return add((q << S) | (q >>> (32 - S)), B); 
} 

function calcMD5(sInp) { 


  wLen = (((sInp.length + 8) >> 6) + 1) << 4; 
  var X = new Array(wLen); 


  j = 4; 
  for (i = 0; (i * 4) < sInp.length; i++) 
  { 
    X[i] = 0; 
    for (j = 0; (j < 4) && ((j + i * 4) < sInp.length); j++) 
    { 
      X[i] += (sAscii.indexOf(sInp.charAt((i * 4) + j)) + 32) << (j * 8); 
    } 
  } 

   
  if (j == 4) 
  { 
    X[i++] = 0x80; 
  } 
  else 
  { 
    X[i - 1] += 0x80 << (j * 8); 
  } 
  for(; i < wLen; i++) { X[i] = 0; } 
  X[wLen - 2] = sInp.length * 8; 
 
  a = 0x67452301; 
  b = 0xefcdab89; 
  c = 0x98badcfe; 
  d = 0x10325476; 

  for (i = 0; i < wLen; i += 16) { 
    aO = a; 
    bO = b; 
    cO = c; 
    dO = d; 

    a = R1(a, b, c, d, X[i+ 0], 7 , 0xd76aa478); 
    d = R1(d, a, b, c, X[i+ 1], 12, 0xe8c7b756); 
    c = R1(c, d, a, b, X[i+ 2], 17, 0x242070db); 
    b = R1(b, c, d, a, X[i+ 3], 22, 0xc1bdceee); 
    a = R1(a, b, c, d, X[i+ 4], 7 , 0xf57c0faf); 
    d = R1(d, a, b, c, X[i+ 5], 12, 0x4787c62a); 
    c = R1(c, d, a, b, X[i+ 6], 17, 0xa8304613); 
    b = R1(b, c, d, a, X[i+ 7], 22, 0xfd469501); 
    a = R1(a, b, c, d, X[i+ 8], 7 , 0x698098d8); 
    d = R1(d, a, b, c, X[i+ 9], 12, 0x8b44f7af); 
    c = R1(c, d, a, b, X[i+10], 17, 0xffff5bb1); 
    b = R1(b, c, d, a, X[i+11], 22, 0x895cd7be); 
    a = R1(a, b, c, d, X[i+12], 7 , 0x6b901122); 
    d = R1(d, a, b, c, X[i+13], 12, 0xfd987193); 
    c = R1(c, d, a, b, X[i+14], 17, 0xa679438e); 
    b = R1(b, c, d, a, X[i+15], 22, 0x49b40821); 

    a = R2(a, b, c, d, X[i+ 1], 5 , 0xf61e2562); 
    d = R2(d, a, b, c, X[i+ 6], 9 , 0xc040b340); 
    c = R2(c, d, a, b, X[i+11], 14, 0x265e5a51); 
    b = R2(b, c, d, a, X[i+ 0], 20, 0xe9b6c7aa); 
    a = R2(a, b, c, d, X[i+ 5], 5 , 0xd62f105d); 
    d = R2(d, a, b, c, X[i+10], 9 ,  0x2441453); 
    c = R2(c, d, a, b, X[i+15], 14, 0xd8a1e681); 
    b = R2(b, c, d, a, X[i+ 4], 20, 0xe7d3fbc8); 
    a = R2(a, b, c, d, X[i+ 9], 5 , 0x21e1cde6); 
    d = R2(d, a, b, c, X[i+14], 9 , 0xc33707d6); 
    c = R2(c, d, a, b, X[i+ 3], 14, 0xf4d50d87); 
    b = R2(b, c, d, a, X[i+ 8], 20, 0x455a14ed); 
    a = R2(a, b, c, d, X[i+13], 5 , 0xa9e3e905); 
    d = R2(d, a, b, c, X[i+ 2], 9 , 0xfcefa3f8); 
    c = R2(c, d, a, b, X[i+ 7], 14, 0x676f02d9); 
    b = R2(b, c, d, a, X[i+12], 20, 0x8d2a4c8a); 

    a = R3(a, b, c, d, X[i+ 5], 4 , 0xfffa3942); 
    d = R3(d, a, b, c, X[i+ 8], 11, 0x8771f681); 
    c = R3(c, d, a, b, X[i+11], 16, 0x6d9d6122); 
    b = R3(b, c, d, a, X[i+14], 23, 0xfde5380c); 
    a = R3(a, b, c, d, X[i+ 1], 4 , 0xa4beea44); 
    d = R3(d, a, b, c, X[i+ 4], 11, 0x4bdecfa9); 
    c = R3(c, d, a, b, X[i+ 7], 16, 0xf6bb4b60); 
    b = R3(b, c, d, a, X[i+10], 23, 0xbebfbc70); 
    a = R3(a, b, c, d, X[i+13], 4 , 0x289b7ec6); 
    d = R3(d, a, b, c, X[i+ 0], 11, 0xeaa127fa); 
    c = R3(c, d, a, b, X[i+ 3], 16, 0xd4ef3085); 
    b = R3(b, c, d, a, X[i+ 6], 23,  0x4881d05); 
    a = R3(a, b, c, d, X[i+ 9], 4 , 0xd9d4d039); 
    d = R3(d, a, b, c, X[i+12], 11, 0xe6db99e5); 
    c = R3(c, d, a, b, X[i+15], 16, 0x1fa27cf8); 
    b = R3(b, c, d, a, X[i+ 2], 23, 0xc4ac5665); 

    a = R4(a, b, c, d, X[i+ 0], 6 , 0xf4292244); 
    d = R4(d, a, b, c, X[i+ 7], 10, 0x432aff97); 
    c = R4(c, d, a, b, X[i+14], 15, 0xab9423a7); 
    b = R4(b, c, d, a, X[i+ 5], 21, 0xfc93a039); 
    a = R4(a, b, c, d, X[i+12], 6 , 0x655b59c3); 
    d = R4(d, a, b, c, X[i+ 3], 10, 0x8f0ccc92); 
    c = R4(c, d, a, b, X[i+10], 15, 0xffeff47d); 
    b = R4(b, c, d, a, X[i+ 1], 21, 0x85845dd1); 
    a = R4(a, b, c, d, X[i+ 8], 6 , 0x6fa87e4f); 
    d = R4(d, a, b, c, X[i+15], 10, 0xfe2ce6e0); 
    c = R4(c, d, a, b, X[i+ 6], 15, 0xa3014314); 
    b = R4(b, c, d, a, X[i+13], 21, 0x4e0811a1); 
    a = R4(a, b, c, d, X[i+ 4], 6 , 0xf7537e82); 
    d = R4(d, a, b, c, X[i+11], 10, 0xbd3af235); 
    c = R4(c, d, a, b, X[i+ 2], 15, 0x2ad7d2bb); 
    b = R4(b, c, d, a, X[i+ 9], 21, 0xeb86d391); 

    a = add(a, aO); 
    b = add(b, bO); 
    c = add(c, cO); 
    d = add(d, dO); 
  } 
  return hex2(a) + hex2(b) + hex2(c) + hex2(d); 
}  	

function entrarPantallaCompleta() {
	try {
		if (parent.innerWidth < 800) {
			launchFullScreen(document.documentElement);
		}
	} catch(err) {
	}
}

function salirPantallaCompleta() {
	cancelFullScreen();
}

function launchFullScreen(element) {
	try {
		if(element.requestFullScreen) {
			element.requestFullScreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		} else {
			parent.maximizar();
		}
	} catch(err) {
	}
}

function cancelFullScreen() {
	try {
		if(document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		} else if(document.msExitFullscreen) {
			document.msExitFullscreen();
		} else {
			parent.minimizar();
		}
	} catch(err) {
	}
}