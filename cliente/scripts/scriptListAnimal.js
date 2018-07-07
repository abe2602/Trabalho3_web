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
	$(".nameAnimal").attr('disabled',true);
	$(".racaAnimal").attr('disabled',true);
	$(".racaPai").attr('disabled',true);
	$(".racaMae").attr('disabled',true);
	$(".dono").attr('disabled',true);
	document.getElementById("servicosAnimal").innerHTML = "";
	servicosReservados();
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
	var i = 0;


	db.onsuccess = function(event){

		db = event.target.result;

		var objectStore = db.transaction("animais").objectStore("animais");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				if(loginAux == cursor.value.dono){
					dogNome.push(cursor.value.nome);
					dogIdade.push(cursor.value.idade);
					dogPeso.push(cursor.value.peso);
					dogDono.push(cursor.value.dono);
					dogRaca.push(cursor.value.raca);
					dogRacaMae.push(cursor.value.racaMae);
					dogRacaPai.push(cursor.value.racaPai);
					dogFoto.push(cursor.value.foto);
					dogKey.push(cursor.key);
					cursor.continue();
				}
			}
			else {
				$(".nameAnimal").val(dogNome[i]);
				$(".idadeAnimal").val(dogIdade[i]);
				$(".pesoAnimal").val(dogPeso[i]);
				$(".nomeDono").val(dogDono[i]);
				$(".racaAnimal").val(dogRaca[i]);
				$(".racaPai").val(dogRacaPai[i]);
				$(".racaMae").val(dogRacaMae[i]);
				$("#borderFoto2").attr("src", dogFoto[i]);
			}
			db.close();

		};
	}




	$("#deleteButtonList").click(function(){
		if(i < 0){
			alert("Não há o que deletar!");
		}else if(dogDono[i] != undefined){
			var db = indexedDB.open("db", 1);

			db.onsuccess = function(event){
				db = event.target.result;

				var transaction = db.transaction(["animais"], "readwrite");
				var store = transaction.objectStore("animais");

				var request = store.delete(dogKey[i]);

				request.onsuccess = function (e) {
					alert("Exluido com sucesso");
					$(".main").load("accountScreen.html");
				}
			};
		}
	});

	$("#saveButtonList").click(function(){
		console.log(dogKey[i]);
		var db = indexedDB.open("db", 1);

		db.onsuccess = function (event) {
			db = event.target.result;

			var store = db.transaction("animais", "readwrite").objectStore("animais");
			var request = store.get(dogKey[i]);

			request.onsuccess = function (e) {
				var result = e.target.result;

				result.idade = $(".idadeAnimal").val();
				result.peso = $(".pesoAnimal").val();

				result.foto = $("#borderFoto2").attr("src");
				store.put(result, dogKey[i]);
			}
			db.close();
		}
	});

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
				servicosReservados();
			}
		}
	});

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
				servicosReservados();
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
