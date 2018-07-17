

$(document).ready(function(){
	//Seleciona os produtos
	var db = indexedDB.open("db", 1);
	var arrayCod = [];
	var arrayImagem = [];
	var arrayNome = [];
	var arrayPreco = [];
	var arrayQuant = [];
	var arrayDesc = [];
	var i = 0;

	//Faz a requisição HTTP para o node.js  class="rCart" id="rCart_'+n+'
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3000/product/listProduct/", true);
	xhr.setRequestHeader("Content-Type", "application/json");


	var arrayCart = [];
	var arrayCart2 = [];
	$('#produtos').on('click', '.addCart', function(){
		var n = parseInt(this.id.split("_").pop());
		console.log(this.id + "=>" + n +"=>"+ $("#"+arrayCod[n]).val());
		arrayCart[n]=$("#"+arrayCod[n]).val();
		arrayCart2[n]=$("#"+arrayCod[n]).val();
		if($("#"+arrayCod[n]).val()==0) $("#carrinho_"+n).html('');
		else $("#carrinho_"+n).html(
			'<input type="checkbox" class="rCart" id="rCart_'+n+'" checked="true">  ' +
			arrayNome[n]+'('+arrayCod[n]+') quantidade: '+$("#"+arrayCod[n]).val()+
			' preço: R$'+ ($("#"+arrayCod[n]).val()*arrayPreco[n])
		);
		var temp = 0;
		for(var j = 0; j < arrayCart.length; j++){
			temp = temp + arrayCart2[j]*arrayPreco[j];
		}
		if(temp==0) $("#cartTotal").html('');
		else $("#cartTotal").html('  Total: R$'+temp);
	});
	$("#carrinho").on('click', '.rCart', function(){
		var n = parseInt(this.id.split("_").pop());
		if(this.checked==false) arrayCart2[n] = 0;
		else arrayCart2[n]=arrayCart[n];
		var temp = 0;
		for(var j = 0; j < arrayCart.length; j++){
			temp = temp + arrayCart2[j]*arrayPreco[j];
		}
		$("#cartTotal").html('  Total: R$'+temp);
	});

	//Espera a resposta do node.js
	xhr.onload = function (){
		var text = xhr.responseText;
		var sizeArrayProduct = JSON.parse(text).length;
		console.log(JSON.parse(text).length);
		console.log(text);

		//Trata a resposta
		if(text==="erro"){
			alert("Erro para achar o servico");
		}else{
			text = text.split("}");
			text.pop();
			console.log(text);
			var list = [];

			for (var k = 0; k < text.length; k++) {
				text[k] = text[k].substr(1) + "}";
				list.push(JSON.parse(text[k]));
			}
			//Coloca a resposta nos vetores utilizados
			for(var j = 0; j < sizeArrayProduct; j++){
				arrayCod.push(list[j].codBarra);
				arrayImagem.push(list[j].imagem);
				arrayNome.push(list[j].nome);
				arrayPreco.push(list[j].preco);
				arrayQuant.push(list[j].quantidade);
				arrayDesc.push(list[j].descricao);

				arrayCart.push(0);
				arrayCart2.push(0);
			}

			//Coloca as imagens na tela
			for(i = 0; i < arrayCod.length; i++) {
				var aux = '<option value="0">0';
				for(j = 1; j <= arrayQuant[i]; j++) {
					aux = aux + '<option value="' + j + '">' + j;
				}
				$("#produtos").append(
					'<div class="col-lg-4 col-md-6 mb-4">' +
					'<div class="card h-100">' +
					'<img class="card-img-top img-fluid" src="'+ arrayImagem[i] +'" width="300" height="300" alt="produto">' +
					'<div class="card-body">' +
					'<h4 class="card-title">' +
					'<p>'+ arrayNome[i] +'</p>' +
					'</h4>' +
					'<h5>R$'+ arrayPreco[i] +'</h5>' +
					'<p class="card-text">'+ arrayDesc[i] +'</p>' +
					'<h6>Em estoque '+ arrayQuant[i] +'</h6>' +
					'</div>' +
					'<div class="card-footer text-center">' +
					'<p> Quantidade: <select id = "' + arrayCod[i] +'">' +
					aux +
					'</select></p>' +
					'<button class="addCart" id ="cart_'+i+'">Add carrinho</button>' +
					'</div>' +
					'</div>' +
					'</div>'
				)
				$("#carrinho").append(
					'<div id="carrinho_'+i+'"></div>'
				)
			}
		}
	};
	xhr.send(null);

	var arrayNameService = [];
	var arrayDateService = [];
	var arrayImageService = [];
	var arrayPrecoService = [];
	let dogNome = [];

	//NÃO APAGAR ESSA LINHA, É IMPORTANTE
	db = indexedDB.open("db", 1);
	db.onsuccess = function(event){
		if(loginAux != null) {
			//Faz a requisição HTTP para o node.js
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://localhost:3000/animal/listAnimal/" + loginAux, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(null);

			//Espera a resposta do node.js
			xhr.onload = function () {
				var text = xhr.responseText;
				var sizeArrayDogs = JSON.parse(text).length;
				console.log("TO AQUIII");
				console.log(JSON.parse(text).length);
				console.log(text);

				//Trata a resposta
				if (text === "erro") {
					alert("Erro para achar o servico");
				} else {
					text = text.split("}");
					text.pop();
					console.log(text);
					var list = [];
					for (var k = 0; k < text.length; k++) {
						text[k] = text[k].substr(1) + "}";
						list.push(JSON.parse(text[k]));
					}

					//Coloca a resposta nos vetores utilizados
					for (var j = 0; j < sizeArrayDogs; j++) {
						dogNome.push(list[j].nome);
					}
				}
			};
		}
	};

	$('#services').on('change', '#serviceName', function(){
		var texto1 = '<img class="card-img-top img-fluid" src="'
		var texto2 = 'Imagens/semFoto.jpeg'
		var texto3 = '" width="300" height="300" alt="serviço">'
		console.log(this.value);
		if(this.value == -1)
		{
			$('#serviceImg').html(texto1+texto2+texto3);
			$('#servicePreco').html('R$----');
		}
		else
		{
			$('#serviceImg').html (texto1+arrayImageService[this.value]+texto3);
			$('#servicePreco').html('R$'+arrayPrecoService[this.value]);
		}
		console.log("foi");
	});

	//NÃO APAGAR ESSA LINHA, É IMPORTANTE
	db = indexedDB.open("db", 1);
	db.onsuccess = function(event) {
		//Lista os serviços
		//Faz a requisição HTTP para o node.js
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:3000/service/listService/", true);
		xhr.setRequestHeader("Content-Type", "application/json");

		//Espera a resposta do node.js
		xhr.onload = function (){
			var text = xhr.responseText;
			var sizeArrayProduct = JSON.parse(text).length;
			console.log(JSON.parse(text).length);
			console.log(text);

			//Trata a resposta
			if(text==="erro"){
				alert("Erro para achar o servico");
			}else{
				text = text.split("}");
				text.pop();

				var list = [];

				for (var k = 0; k < text.length; k++) {
					text[k] = text[k].substr(1) + "}";
					list.push(JSON.parse(text[k]));
				}

				//Coloca a resposta nos vetores utilizados
				for(var j = 0; j < sizeArrayProduct; j++){
					arrayImageService.push(list[j].imagem);
					arrayNameService.push(list[j].nome);
					arrayPrecoService.push(list[j].preco);
				}
					console.log("AAAAAAAAAAAAAAAAAAAAAA");
					console.log(dogNome);
					console.log(arrayNameService);
					console.log("AAAAAAAAAAAAAAAAAAAAAA");

				//PAREI AQUI, VAMOS VER
				var TextoA = '<option value= "-1">Serviços...</option>';
				for(i = 0; i < arrayPrecoService.length; i++) {
					TextoA = TextoA + '<option value= "'+i+'">'+arrayNameService[i]+'</option>'
				}
				var TextoB = '<option value= "-1">Seus Pet...</option>';
				for(i = 0; i < dogNome.length; i++) {
					TextoB = TextoB + '<option value= "'+i+'">'+dogNome[i]+'</option>'
				}

				$("#services").append(
					'<div class="col-lg-4 col-md-6 mb-4">' +
					'<div class="card h-100">' +
					'<div id="serviceImg">' +
						'<img class="card-img-top img-fluid" src="Imagens/semFoto.jpeg" width="300" height="300" alt="serviço">' +
					'</div>' +
					'<div class="card-body"></div>' +
					'</div></div>' +
					'<div class="col-lg-4 col-md-6 mb-4">' +
					'<div class="card h-100">' +
					'<div class="card-body">' +
					'<h4 class="card-title">' +
					'</h4>' +
					'<h5 class="card-text"> Escolha o serviço: </h5>' +
					'<p><select id = "serviceName">'+TextoA+'</select></p>' +
					'<h5 class="card-text"> Nome do animal: </h5>' +
					'<p><select id = "dogName">'+TextoB+'</select></p>' +
					'<h5 class="card-text"> Data/horário:</h5><p>(não trabalhamos de domingo)</p>' +
					'<input type = "date" id = "serviceDay">' +
					'<p><select id = "serviceTime">' +
						'<option value="08:00:00">8 : 00</option>' +
						'<option value="09:00:00">9 : 00</option>' +
						'<option value="10:00:00">10 : 00</option>' +
						'<option value="11:00:00">11 : 00</option>' +
						'<option value="13:00:00">13 : 00</option>' +
						'<option value="14:00:00">14 : 00</option>' +
						'<option value="15:00:00">15 : 00</option>' +
						'<option value="16:00:00">16 : 00</option>' +
						'<option value="17:00:00">17 : 00</option>' +
						'<option value="18:00:00">18 : 00</option>' +
						'</select></p>' +
					'<h5 id="servicePreco">R$----</h5>' +
					'</div>' +
					'</div>' +
					'</div>'
				)
			}
		};

		xhr.send(null);

	};


/*PAREI AQUI*/
	

	$("#comprarProduto").click(function(){
		if(loginAux == null)
			alert("LOGUE-SE PARA COMPRAR");
		else{
			for(var j = 0; j < arrayCod.length; j++){
				realizaCompra(arrayCod[j],arrayCart2[j]);
			}

			alert("Compra realizada com sucesso!");
			$(".main").load("accountScreen.html");
		}
	})

	$("#marcarService").click(function(){
		if(loginAux == null)
			alert("LOGUE-SE PARA MARCAR");
		else {
			if(($("#serviceName").val() == -1)||($("#dogName").val() == -1)||($("#serviceDay").val().length == 0)){
				alert("Preencha todos os campos");
			}
			else {
				var dayTest = new Date($("#serviceDay").val()+'T'+$("#serviceTime").val()+'Z');
				if(dayTest.getDay()==0)
				{
					alert("Não trabalhamos de domingo");
					return;
				}
				marcarService(
					dogNome[$("#dogName").val()],
					new Date($("#serviceDay").val()+'T'+$("#serviceTime").val()+'Z'),
					arrayNameService[$("#serviceName").val()],
					arrayPrecoService[$("#serviceName").val()],
					arrayImageService[$("#serviceName").val()]);

				alert("Serviço marcado com sucesso!");
				$(".main").load("accountScreen.html");
			}
		}
	});

	/*Funções auxíliares*/
	function marcarService(nomeAnimal, data, nome, preco, imagem)
	{
		if(nomeAnimal.length != 0){
			var haveService = JSON.stringify({
				animal:nomeAnimal,
				nome:nome,
				preco:preco,
				imagem:imagem,
				data:data
			});

			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://localhost:3000/utils/haveService", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			console.log("mandei o haveService");
			console.log(haveService);
			xhr.send(haveService);

			xhr.onreadystatechange = function(){
				if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
					var text = xhr.responseText;

					if(text === "ok"){
						console.log("deu bom");
						alert("Serviços agendatos com sucesso!");
						$(".main").load("accountScreen.html");
					}else{
						console.log("Algum erro aconteceu");
					}
					console.log(text);
				}
			};
		}
	}

	function realizaCompra(id, quantidade)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", "http://localhost:3000/utils/buyStuff/" + id, true);
		xhr.setRequestHeader("Content-Type", "application/json");

		data = JSON.stringify({
			quantidade: quantidade
		});

		console.log(data);
		xhr.send(data);

		xhr.onreadystatechange = function (){
			var text = xhr.responseText;

			if(this.readyState == xhr.DONE){
				if(text==="ok"){
					alert("Produto comprado com sucesso!");
					//Tem que ir para o carrinho
				}else{
					alert("Erro na transação");
				}
			}
		}
	}


});
