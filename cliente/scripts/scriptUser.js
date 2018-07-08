/*Script que da funcionalidade a tela do usuário*/
$(document).ready(function(){
	//Botão de listar animais
	$("#listAnimal").click(function(){
		$(".main").load("listAnimalScreen.html");
	});

	//Botão de adicionar animal
	$("#addAnimal").click(function(){
		$(".main").load("addAnimalScreen.html");
	});

	//Botão de sair
	$("#btOut").click(function(){
		//AQUIII
		$(".fa-shopping-cart").remove();
		$(".main").load("initialScreen.html");

		$("#loginScreen").text("Entrar");
		loginAux = null;

		$("#loginScreen").click(function(){
			$(".main").load("loginScreen.html");
		});
	});

	//Botão de atualizar
	$("#btSave").click(function(){
		nome = $("#nomeUser").val();
		tel = $("#telUser").val();
		rua = $("#streetUser").val();
		numCasa = $("#numCasaUser").val();
		bairro = $("#bairroUser").val();
		numCartao = $("#numCard").val();
		bandeiraCartao = $("#flagCard").val();
		foto = $("#borderFoto1").attr("src");

		var xhr = new XMLHttpRequest();
		xhr.open("PUT", "http://localhost:3000/user/updateUser/" + loginAux, true);
		xhr.setRequestHeader("Content-Type", "application/json");

		data = JSON.stringify({
			password : " ",
			foto : foto,
			nome : nome,
			email : loginAux,
			tel : tel,
			rua: rua,
			bairro: bairro,
			numCasa: numCasa,
			numCartao: numCartao,
			bandeiraCartao: bandeiraCartao,
			isAdmin: false,
			idAdmin: 0
		});

		console.log(data);
		xhr.send(data);

		xhr.onreadystatechange = function (){
			var text = xhr.responseText;

			if(this.readyState == xhr.DONE){
				if(text==="ok"){
					alert("Atualização concluida");
				}else{
					alert("Erro na alteração");
				}
			}
		}
	});

	//Carrega os dados
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
				var list = []
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
				$("#borderFoto1").attr("src", list[0].foto);
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