$(document).ready(function(){
	var db = indexedDB.open("db", 1);
	var arrayCod = [];
	var arrayImagem = [];
	var arrayNome = [];
	var arrayPreco = [];
	var arrayQuant = [];
	var arrayDesc = [];
	var i = 0;

	db.onsuccess = function(event) {
		db = event.target.result;

		var objectStore = db.transaction("product").objectStore("product");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				arrayCod.push(cursor.value.codigoBarra);
				arrayImagem.push(cursor.value.imagem);
				arrayNome.push(cursor.value.nome);
				arrayPreco.push(cursor.value.preco);
				arrayQuant.push(cursor.value.quantidade);
				arrayDesc.push(cursor.value.descricao);
				cursor.continue();
			}
			else {
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
								'</div>' +
							'</div>' +
						'</div>'
					)
				}
				console.log(arrayNome[i]);
			}
			db.close();
		}
	}


	var arrayNameService = [];
	var arrayDateService = [];
	var arrayImageService = [];
	var arrayPrecoService = [];
	let arrayKey = [];
	let dogNome = [];

	db = indexedDB.open("db", 1);
	db.onsuccess = function(event) {

		db = event.target.result;

		var objectStore1 = db.transaction("animais").objectStore("animais");
		objectStore1.openCursor().onsuccess = event => {
			if(loginAux != null){
				let cursor1 = event.target.result;
				if (cursor1) {
					if(loginAux == cursor1.value.dono){
						dogNome.push(cursor1.value.nome);
						cursor1.continue();
					}
				}
			}
		}

		var objectStore = db.transaction("service").objectStore("service");
		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				arrayNameService.push(cursor.value.nome);
				arrayImageService.push(cursor.value.imagem);
				arrayPrecoService.push(cursor.value.preco);
				arrayKey.push(cursor.key);
				cursor.continue();
			}
			else {
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
									'<select id = "dog"></select>' +
								'</div>' +
								'<div class="card-footer text-center">' +
									'<p> Data: <input type = "date" id = "service"></p>' +
									'<p> Horário: <select id = "time"></select></p>' +
								'</div>' +
							'</div>' +
						'</div>'
					)
				}
				for(i = 0; i < arrayPrecoService.length; i++) {
					var select = document.getElementById('dog');
					for(index in dogNome) {
					    select.options[select.options.length] = new Option(dogNome[index], index);
						}
				}
				$("#service").change(function(){
						document.getElementById("time").innerHTML = '';
						var myDate = new Date($('#service').val());
						var n = myDate.getDay() + 1;
						if( n != 7){
							$("#time").append(
									'<option value= "8:00">8 : 00</option>' +
									'<option value= "9:00">9 : 00</option>' +
									'<option value="10:00">10 : 00</option>' +
									'<option value="11:00">11 : 00</option>' +
									'<option value="13:00">13 : 00</option>' +
									'<option value="14:00">14 : 00</option>' +
									'<option value="15:00">15 : 00</option>' +
									'<option value="16:00">16 : 00</option>' +
									'<option value="17:00">17 : 00</option>' +
									'<option value="18:00">18 : 00</option>'
							
							)
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
			db.close();
		}
	}





	$("#comprarProduto").click(function(){
		if(loginAux == null)
			alert("LOGUE-SE PARA COMPRAR");
		else{
			for(var j = 0; j < arrayCod.length; j++){
				realizaCompra(arrayCod[j],$("#"+arrayCod[j]).val());
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
				if(($("#dog").val().length == 0) && ($("#service").val().length == 0))
					aux2 = aux2 - 1;
				else if(($("#dog").val().length == 0) || ($("#service").val().length == 0))
					aux = aux * 0;
			}
			if(aux == 0 || aux2 == 0){
				if (aux2 == 0) alert("Nenhum serviço escolhido.");
				else if (aux == 0) alert("Preencha todos os campos dos serviços escolhidos!");
			}
			else {
				for (var j = 0; j < arrayPrecoService.length; j++) {
					console.log(arrayNameService[j] + " " + $("#service").val() + $("#dog").val());

					marcarService($("#dog").val(), $("#service").val() + " " + $("#time").val(), arrayNameService[j], arrayPrecoService[j], arrayImageService[j]);
				}
				console.log("Dados: " + $("#service").val() + " " + $("#time").val());
				alert("Serviços agendatos com sucesso!");
				$(".main").load("accountScreen.html");
			}
		}
	})

	/*Funções auxíliares*/
	function marcarService(nomeAnimal, data, nome, preco, imagem)
	{
		var db = indexedDB.open("db", 1);
		var service = {
			data:data,
			nome:nome,
			preco:preco,
			imagem:imagem
		}

		if(nomeAnimal.length != 0){
			db.onsuccess = function(event){
				db = event.target.result;

				var haveService = {
					animal:nomeAnimal,
					service:service
				}

				var transaction = db.transaction(["haveService"], "readwrite");
				var store = transaction.objectStore("haveService");
				var request = store.add(haveService);

				request.onsuccess = function(e){
					console.log("Marcado com sucesso");
				}

				request.onerror = function(e){
					console.log("Problema ao marcar");
				}
				db.close();
			}
		}
	}

	function realizaCompra(id, quantidade)
	{
		var db = indexedDB.open("db", 1);
		db.onsuccess = function(event) {

			db = event.target.result;

			var transaction = db.transaction(["product"], "readwrite");
			var store = transaction.objectStore("product");
			var request = store.get(id);

			request.onsuccess = function(e){
				var result = e.target.result;

				var x = result.quantidade;
				var y = x - quantidade;

				result.quantidade = y;
				store.put(result);

				console.log("Compra efetuada");
			}

			request.onerror = function(e){
				console.log("Problema na compra");
			};

			db.close();
		}
	}
});
