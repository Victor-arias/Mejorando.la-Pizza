var nodo, papel, pizza;
$(document).on("ready", inicio);
function inicio()
{
	//delete localStorage.nombre;
	$('#formulario').on("submit", guardar);
	transicion();
}
function guardar(eventico)
{
	eventico.preventDefault();
	var n = $("#nombre").val();
	localStorage.nombre = n;
	transicion();
}
function transicion()
{
	var nombre = localStorage.nombre;
	if(nombre)
	{
		$("#nombre").hide();
		$("#enviar").css("display", "none");
		$("label[for='nombre']").text("¡¡¡A comerrrrr " + nombre + "!!!");
		$("#historia").slideUp();
		$("#pizzamaker").slideDown();
		//conectar(nombre);
		//geolocalizar();
		dibujar();
	}
}
function aleatorio(min, max)
{
	return Math.floor(Math.random() * (min - max + 1) + max);
}
function dibujar()
{
	papel = Raphael("canvas", 200, 200);
	//un set es como un grupo
	pizza = papel.set();
	//push es similar a addChild de AS3
	pizza.push(
		papel.image("base.png", 0, 0, 200, 200)
	);
	$("#ingredientes article").on("click", addIngrediente);
}
function addIngrediente(ev)
{
	var ingred = ev.currentTarget.id;
	var rotacion = aleatorio(0, 360);
	var tx = aleatorio(-30, 90);
	var ty = aleatorio(-60, 90);
	var escala = aleatorio(2, 7);
	var trocito = papel.image(ingred + ".png", tx, ty, 150, 150);
	trocito.rotate(rotacion);
	trocito.scale(escala * 0.1, escala * 0.1);
	pizza.push(trocito);
	$("#pizza ul").append("<li>" + ingred + "</li>");
}
function geolocalizar()
{
	navigator.geolocation.getCurrentPosition(mostrarMapa, errorMapa);
	//navigator.geolocation.getCurrentPosition(mostrarOMapa, errorMapa);
}
function mostrarMapa(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	$("status").text("Ajá! Te encontré en: " + lat + ", " + lon);
	var coordenada = new google.maps.LatLng(lat, lon);
	var opciones = 
	{
		center: coordenada,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var mapa = new google.maps.Map
	(
		$("mapa_canvas")[0],
		opciones
	);
	$("mapa_canvas").css("height", "400px")
					.css("width", "100%");
	var opChinche = 
	{
		position: coordenada,
		map: mapa,
		title: "Coordenadas de bombardeo"
	};
	var chinche = new google.maps.Marker(opChinche);
	//Con infoWindow puedo ponerle HTML al title
}
function mostrarOMapa(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	$("#status").text("Ajá¡! Estás en: " + lat + "," + lon);
	var map, layer;
	map = new OpenLayers.Map('mapa_canvas');
	$("#mapa_canvas").css("height","400px")
					 .css("width", "100%");
    layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
    map.addLayer(layer);
    map.setCenter(
        new OpenLayers.LonLat(lon, lat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 18
    );   
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
 	var lonLat = new OpenLayers.LonLat( lon , lat );
    markers.addMarker(new OpenLayers.Marker(lonLat));
}
function errorMapa(errorsh)
{
	$("status").text("Tarde o temprano ¬_¬");
}
function conectar(nombre)
{
	nodo = io.connect("http://192.168.2.82:6969");
	nodo.emit("ingresoUsuario", nombre);
	nodo.on("notificarNombre", saludar);
}
function saludo(serverNombre)
{
	$("label[for='nombre']").text(serverNombre + " es un poder!!!").fadeOut().fadeIn();
}