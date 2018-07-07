function servicosReservados(){
	var dogsService = [];
	var serviceService = [];

	db = indexedDB.open("db", 1);

	db.onsuccess = function(event){
		db = event.target.result;

		var objectStore = db.transaction("haveService").objectStore("haveService");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				alert(cursor.value.service['imagem']);
				if(cursor.value.animal == $(".nameAnimal").val()){

					/*dogsService.push(cursor.value.animal);
					serviceService.push(cursor.value.service);*/
					$("#servicosAnimal").append(
						'<div class="pg1 row">' +
					    '<div class="col-sm-12">' +
					      '<img class="img-fluid float-left" src="' + cursor.value.service['imagem'] + '" alt="imagem" width="200" height="200">' +
					      '<div class="content-heading">' +
					        '<h1>' + cursor.value.service['nome'] + '</h1>' +
					      '</div>' +
					      '<p> Data marcada:' + cursor.value.service['data'] + '</p>' +
								'<p> Valor:' + cursor.value.service['preco'] + '</p>' +
					    '</div>' +
					  '</div>'
					)
					cursor.continue();
				}
			}
			db.close();
		};
	}
}

$(document).ready(function(){
	document.getElementById("servicosAnimal").innerHTML = "";
	//servicosReservados();

	/*Encontra os animais do dono*/
	var db = indexedDB.open("db", 1);
	let dogNome = [];
	let dogIdade = [];
	let dogPeso = [];
	let dogDono = [];
	let dogRaca = [];
	let dogRacaMae = [];
	let dogRacaPai = [];
	let dogFoto = [];
	let dogKey = [];
	let i = 0;

	//Faz a requisição HTTP para o node.js
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3000/animal/listAnimal/" + loginAux, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	//Espera a resposta do node.js
	xhr.onload = function (){
		var text = xhr.responseText;
		var sizeArrayDogs = JSON.parse(text).length;
		console.log(JSON.parse(text).length);
		console.log(text);

		//Trata a resposta
		if(text==="erro"){
			alert("Erro para achar o servico");
		}else{
			text = text.split("}")
			text.pop();
			console.log(text)
			var list = [];
			for (var k = 0; k < text.length; k++) {
				text[k] = text[k].substr(1) + "}";
				list.push(JSON.parse(text[k]));
			}

			//Coloca a resposta nos vetores utilizados
			for(var j = 0; j < sizeArrayDogs; j++){
				dogFoto.push(list[j].foto);
				dogDono.push(list[j].dono);
				dogNome.push(list[j].nome);
				dogIdade.push(list[j].idade);
				dogPeso.push(list[j].peso);
				dogRaca.push(list[j].raca);
				dogRacaMae.push(list[j].racaMae);
				dogRacaPai.push(list[j].racaPai);
				dogKey.push(list[j]._id);
			}

			//Coloca o texto nas textBox
			$(".nameAnimal").val(dogNome[i]);
			$(".idadeAnimal").val(dogIdade[i]);
			$(".pesoAnimal").val(dogPeso[i]);
			$(".nomeDono").val(dogDono[i]);
			$(".racaAnimal").val(dogRaca[i]);
			$(".racaPai").val(dogRacaPai[i]);
			$(".racaMae").val(dogRacaMae[i]);
		}
	};

	xhr.send(null);

	/*Funções dos botões*/
	//delete
	$("#deleteButtonList").click(function(){
		if(i < 0){
			alert("Não há o que deletar!");
		}else if(dogDono[i] != undefined){
			//Faz a requisição HTTP para o node.js
			var xhr = new XMLHttpRequest();
			xhr.open("DELETE", "http://localhost:3000/animal/deleteAnimal/" + dogKey[i], true);
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function (){
				if(this.readyState == xhr.DONE){
					console.log("Excluido com sucesso");
					alert("Excluido com sucesso");
					$(".main").load("accountScreen.html");
				}
			}

			xhr.send(null);
		}
	});
	//atualizar
	$("#saveButtonList").click(function(){
		console.log(dogKey[i]);

		var xhr = new XMLHttpRequest();
		xhr.open("PUT", "http://localhost:3000/animal/updateAnimal/" + dogKey[i], true);
		xhr.setRequestHeader("Content-Type", "application/json");

		var data = JSON.stringify({
			dono : loginAux,
			nome : $(".nameAnimal").val(),
			idade : $(".idadeAnimal").val(),
			peso : $(".pesoAnimal").val(),
			raca : $(".racaAnimal").val(),
			racaPai : $(".racaPai").val(),
			racaMae : $(".racaMae").val(),
			foto : $("#borderFoto2").attr("src")
		});

		console.log(data);
		xhr.send(data);

		xhr.onreadystatechange = function (){
			var text = xhr.responseText;

			if(this.readyState == xhr.DONE){
				if(text==="ok"){
					alert("Atualização concluida");
					$(".main").load("accountScreen.html");
				}else{
					alert("Erro na alteração");
				}
			}
		}

	});
	//voltar
	$("#previousButtonList").click(function(){
		console.log("previous");

		if(dogKey[i] != undefined){
			if(i > 0){
				i = i - 1;

				$(".nameAnimal").val(dogNome[i]);
				$(".idadeAnimal").val(dogIdade[i]);
				$(".pesoAnimal").val(dogPeso[i]);
				$(".nomeDono").val(dogDono[i]);
				$(".racaAnimal").val(dogRaca[i]);
				$(".racaPai").val(dogRacaPai[i]);
				$(".racaMae").val(dogRacaMae[i]);
				$("#borderFoto2").attr("src", dogFoto[i]);
				document.getElementById("servicosAnimal").innerHTML = "";
				//servicosReservados();
			}
		}
	});
	//próximo
	$("#nextButtonList").click(function(){
		console.log(dogIdade.length);

		if(dogKey[i] != undefined){
			if(i < dogIdade.length - 1) {
				i++;

				$(".nameAnimal").val(dogNome[i]);
				$(".idadeAnimal").val(dogIdade[i]);
				$(".pesoAnimal").val(dogPeso[i]);
				$(".nomeDono").val(dogDono[i]);
				$(".racaAnimal").val(dogRaca[i]);
				$(".racaPai").val(dogRacaPai[i]);
				$(".racaMae").val(dogRacaMae[i]);
				$("#borderFoto2").attr("src", dogFoto[i]);
				document.getElementById("servicosAnimal").innerHTML = "";
				//servicosReservados();
			}
		}
	});
});

/* Altera foto do animal listado */
document.querySelector("#file1").addEventListener('change', function () {
	const [file] = this.files;
	if (file) {
		var str = "Imagens\\" + file.name;
		$("#borderFoto2").attr("src", str);
	}
});
