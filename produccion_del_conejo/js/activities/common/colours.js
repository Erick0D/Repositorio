function asignaColor()
{
	if((colorFondo != "inicio")&&(colorBotonesC != "inicio")&&(colorBotonesO != "inicio")&&(colorFondoC != "inicio")&&(colorFondoO != "inicio")&&(colorFuente != "inicio")&&(colorFuenteB != "inicio"))
	{
		var cadenaColor = "<style>";
        cadenaColor += "#preLoad, #contentPreActividad, #preActividad,.toggleMostrar a {background:"+colorFondo+";color:"+colorFuente+";}#headAct { background:"+colorFondoC+";}";
        cadenaColor += ".titActividad a, #headAct {color:"+colorFuente+";}";
		cadenaColor += ".boxIndicadores{color:"+colorFuente+";background: "+colorFondoO+";background: -moz-linear-gradient(top,  "+colorFondoO+" 0%, "+colorFondoC+" 70%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,"+colorFondoO+"), color-stop(70%,"+colorFondoC+"));background: -webkit-linear-gradient(top,  "+colorFondoO+" 0%,"+colorFondoC+" 70%);background: -o-linear-gradient(top,  "+colorFondoO+" 0%,"+colorFondoC+" 70%);background: -ms-linear-gradient(top,  "+colorFondoO+" 0%,"+colorFondoC+" 70%);background: linear-gradient(to bottom,  "+colorFondoO+" 0%,"+colorFondoC+" 70%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"+colorFondoO+"', endColorstr='"+colorFondoC+"',GradientType=0 );}";
        cadenaColor += ".btn-primary {background: "+colorBotonesC+";color:"+colorFuenteB+";background: -moz-linear-gradient(top,  "+colorBotonesC+" 0%, "+colorBotonesO+" 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,"+colorBotonesC+"), color-stop(100%,"+colorBotonesO+"));background: -webkit-linear-gradient(top,  "+colorBotonesC+" 0%,"+colorBotonesO+" 100%);background: -o-linear-gradient(top,  "+colorBotonesC+" 0%,"+colorBotonesO+" 100%);background: -ms-linear-gradient(top,  "+colorBotonesC+" 0%,"+colorBotonesC+" 100%);background: linear-gradient(to bottom,  "+colorBotonesC+" 0%,"+colorBotonesO+" 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"+colorBotonesC+"', endColorstr='"+colorBotonesO+"',GradientType=0 );}";
		cadenaColor += ".btn-primary:hover {background: "+colorBotonesC+";}";
		cadenaColor += ".btn-primary:active {background:"+colorBotonesO+";}";
		if (colorFuente != '#FFFFFF') {
			cadenaColor += ".iSensible, .accordionButton, .optionsAct a {background-image: url(img/iconsBlack.png);}";
			cadenaColor += ".optionsAct a {border-left:1px solid rgba(0,0,0,0.3);}";
			cadenaColor += ".toggleMostrar {border-bottom:1px solid rgba(0,0,0,0.3);}";
			cadenaColor += ".infoExtraPreAct, .franjaPersonalizada {border-top:1px solid rgba(0,0,0,0.3);}";
		}
		if (colorFuenteB == '#FFFFFF') {
			cadenaColor += ".btn-primary:hover {color:#FFF;}";
			cadenaColor += ".btn-primary {text-shadow: 0 1px 0 rgba(0,0,0,0.5);}";
		}
		cadenaColor += "</style>";
		$("head").append(cadenaColor);
	}
	else
	{
		setTimeout(function(){asignaColor();},200);
	}
}

colorFuenteB = "inicio";
colorFuente = "inicio";
colorFondo = "inicio";
colorFondoC = "inicio";
colorFondoO = "inicio";
colorBotonesC = "inicio";
colorBotonesO = "inicio";
asignaColor();