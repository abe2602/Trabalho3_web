

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

				//PAREI AQUI, VAMOS VER
				for(i = 0; i < arrayPrecoService.length; i++) {
					$("#services").append(
						'<div class="col-lg-4 col-md-6 mb-4">' +
						'<div class="card h-100">' +
						'<img class="card-img-top img-fluid" src="'+ arrayImageService[i] +'" width="300" height="300" alt="serviço">' +
						'<div class="card-body">' +
						'<h4 class="card-title">' +
						'<p>'+ arrayNameService[i] +'</p>' +
						'</h4>' +
						'<h5>R$'+ arrayPrecoService[i] +'</h5>' +
						'<p class="card-text"> Nome do animal(apenas para usuarios): </p>' +
						'<select id = "dog'+i+'"></select>' +
						'</div>' +
						'<div class="card-footer text-center">' +
						'<p> Data: <input type = "date" id = "service'+i+'"></p>' +
						'<p> Horário: <select id = "time'+i+'">' +
							'<option value= "8:00">8 : 00</option>' +
							'<option value= "9:00">9 : 00</option>' +
							'<option value="10:00">10 : 00</option>' +
							'<option value="11:00">11 : 00</option>' +
							'<option value="13:00">13 : 00</option>' +
							'<option value="14:00">14 : 00</option>' +
							'<option value="15:00">15 : 00</option>' +
							'<option value="16:00">16 : 00</option>' +
							'<option value="17:00">17 : 00</option>' +
							'<option value="18:00">18 : 00</option>' +
							'</select></p>' +
						'</div>' +
						'</div>' +
						'</div>'
					)
				}

				//Bugs aqui!!
				for(i = 0; i < arrayPrecoService.length; i++) {
					var select = document.getElementById('dog'+i);
					console.log(select.options.length);

					for(index in dogNome) {
						select.options[select.options.length] = new Option(dogNome[index], index);
					}
				}
				$("#service").change(function(){
					document.getElementById("time").innerHTML = '';
					var myDate = new Date($('#service').val());
					var n = myDate.getDay() + 1;
					if( n != 7){
						document.getElementById("marcarService").disabled = false;
						$("#marcarService").attr('disabled',false);
						$("#marcarService").attr('style',  'background-color:rgb(56, 137, 76)');
						$("#marcarService").css( 'cursor', 'pointer' );

					}
					else{
						document.getElementById("marcarService").disabled = true;
						$("#marcarService").attr('disabled',true);
						$("#marcarService").attr('style',  'background-color:rgb(100, 100, 100)');
						$("#marcarService").css( 'cursor', 'default' );
						alert("Não atendemos de domingo ");
					}
				});
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
			var aux = 1, aux2 = arrayPrecoService.length;
			for (var j = 0; j < arrayPrecoService.length; j++) {
				if(($("#dog" + j).val().length == 0) && ($("#service" + j).val().length == 0))
					aux2 = aux2 - 1;
				else if(($("#dog" + j).val().length == 0) || ($("#service" + j).val().length == 0))
					aux = aux * 0;
			}
			if(aux == 0 || aux2 == 0){
				if (aux2 == 0) alert("Nenhum serviço escolhido.");
				else if (aux == 0) alert("Preencha todos os campos dos serviços escolhidos!");
			}
			else {
				for (var j = 0; j < arrayPrecoService.length; j++) {
					console.log(arrayNameService[j] + " " + $("#service" + j).val() + $("#dog" + j).val());

					marcarService($("#dog" + j).val(), $("#service" + j).val() + " " + $("#time" + j).val(), arrayNameService[j], arrayPrecoService[j], arrayImageService[j]);
				}
			}
		}
	});

	/*Funções auxíliares*/
	function marcarService(nomeAnimal, data, nome, preco, imagem)
	{
		if(nomeAnimal.length != 0){
			var haveService = JSON.stringify({
				animal:'Nina',
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
