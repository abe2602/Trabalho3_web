/*Script que da funcionalidade a tela do usuário*/
$(document).ready(function(){
	$("#listAnimal").click(function(){
		$(".main").load("listAnimalScreen.html");
	});
	
	$("#addAnimal").click(function(){
		$(".main").load("addAnimalScreen.html");
	});	

	$("#btOut").click(function(){
		//AQUIII
		$(".fa-shopping-cart").remove();
		$("#loginScreen").text("Entrar");
		loginAux = null;

		$(".main").load("initialScreen.html");

		$("#loginScreen").click(function(){
			$(".main").load("loginScreen.html");
		});
	});

	$("#btSave").click(function(){

		var name, email, tel, street, numCasa, bairro;
		var db = indexedDB.open("db", 1);

		db.onsuccess = function (event) {
			db = event.target.result;

			var transaction = db.transaction(["usuarios"], "readwrite");
			var store = transaction.objectStore("usuarios");

			if(loginAux != null) {
				var request = store.get(loginAux);

				request.onsuccess = function (e) {
					var result = e.target.result;

					result.nome = $("#nomeUser").val();
					result.telefone = $("#telUser").val();
					result.rua = $("#streetUser").val();
					result.numCasa = $("#numCasaUser").val();
					result.bairro = $("#bairroUser").val();
					result.numCartao = $("#numCard").val();
					result.bandeiraCartao = $("#flagCard").val();
					result.foto = $("#borderFoto1").attr("src");

					store.put(result);
				}
				db.close();
			}
		}
	});

	if(loginAux != null){
		var db = indexedDB.open("db", 1);

		db.onsuccess = function(event){
			db = event.target.result;

			var transaction = db.transaction(["usuarios"], "readwrite");
			var store = transaction.objectStore("usuarios");

			var request = store.get(loginAux);

			request.onsuccess = function(e){
				var result = e.target.result;

				$("#nomeUser").val(result.nome);
				$("#emailUser").val(result.email);
				$("#telUser").val(parseInt(result.telefone));
				$("#streetUser").val(result.rua);
				$("#numCasaUser").val(parseInt(result.numCasa));
				$("#bairroUser").val(result.bairro);
				$("#borderFoto1").attr("src", result.foto);

				if(result.bandeiraCartao != null)
					$("#flagCard").val(result.bandeiraCartao);

				if(result.numCartao != null)
					$("#numCard").val(result.numCartao);
			}
			db.close();
		};
	}
});

/* Altera foto da conta do usuario */
document.querySelector("#file").addEventListener('change', function () {
		const [file] = this.files;
		if (file) {
			var str = "Imagens\\" + file.name;
			$("#borderFoto1").attr("src", str);
		}
});