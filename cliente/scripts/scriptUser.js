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

	if(loginAux.length != 0){

		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:3000/user/getUserData/" + loginAux, true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onload = function (){
			var text = xhr.responseText;
			console.log(JSON.parse(text).length);
			console.log(text);

			if(text==="erro"){
				alert("Erro para achar o servico");
			}else{
				text = text.split("}")
				text.pop();
				console.log(text)
				list = []
				for (var i = 0; i < text.length; i++) {
					text[i] = text[i].substr(1) + "}";
					list.push(JSON.parse(text[i]));
				}
				$("#nomeUser").val(list[0].nome);
				$("#emailUser").val(list[0].email);
				$("#telUser").val(list[0].tel);
				$("#streetUser").val(list[0].rua);
				$("#numCasaUser").val(list[0].numCasa);
				$("#bairroUser").val(list[0].bairro);
				$("#numCard").val(list[0].numCartao);
				$("#flagCard").val(list[0].bandeiraCartao);
			}
		};
		xhr.send(null);
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