/*Script que da funcionalidade a tela de Login*/
$(document).ready(function(){
	$("#btCadastrar").click(function(){
		$(".main").load("cadastroScreen.html");
	});

	$("#btEntrar").click(function(){
		var email = $("#emailLogin").val();
		var password = $("#passwordLogin").val();

		if(email.length == 0 || password.length == 0){
			alert("Algum dos campos está vazio!");
		}else{
			try{
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://localhost:3000/utils/login", true);

				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function(){
					if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var text = xhr.responseText;
						//var inf = JSON.parse(text);

						if(text === "erro"){
							alert("Usuario e senha inválidas");
						}else{
							loginAux = email;
							$("#loginScreen").text("Conta");

							if(text === "admin"){
								$("#loginScreen").click(function(){
									$(".main").load("adminScreen.html");
								});
								$(".main").load("adminScreen.html");
							}else{
								$("#loginScreen").click(function(){
									$(".main").load("accountScreen.html");
								});
								$(".main").load("accountScreen.html");
							}
						}
					}
				};
				data = JSON.stringify({email: email,password: password});
				console.log(data);
				xhr.send(data);

			}catch(err){
				console.log(err.message);
			}
		}
	});
});
