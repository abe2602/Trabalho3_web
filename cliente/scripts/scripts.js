$(document).ready(function(){
	$(".main").load("initialScreen.html");

	/*Funções de direcionamento do menu, por enquanto, só há a mudança da tag <main> para a respectiva
	nova tela.
	Exemplo: Se foi clicado em "Home", todo o conteúdo entre a tag main será substituído.*/
	$(".initialScreen").click(function(){
		$(".main").load("initialScreen.html");
	});

	$("#productsScreen").click(function(){
		$(".main").load("productScreen.html");
	});

	$("#contactScreen").click(function(){
		$(".main").load("contactScreen.html");
	});

	$("#aboutScreen").click(function(){
		$(".main").load("aboutScreen.html");
	});

	$("#unityScreen").click(function(){
		$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC6yV1bBZ2w_IU426kWMqzjVcRYorF-rzs",function() {
  			initMap();
		});
		$(".main").load("unityScreen.html");
	});

	$("#structureScreen").click(function(){
		$(".main").load("structureScreen.html");
	});
	//AQUIIII
	$(".fa-shopping-cart").click(function(){
		$(".main").load("shoppingCart.html");
	});

	$("#loginScreen").click(function(){
		if(loginAux == null)
			$(".main").load("loginScreen.html");
	});
});

function initMap(){
	var myLatLng = {lat: -22.006982, lng: -47.894945};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Marker'
    });
}
