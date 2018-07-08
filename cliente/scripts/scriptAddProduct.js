$(document).ready(function(){
	$("#subButtonId").click(function(){
		var name = $("#inputName").val();
		var quantidade = $("#inputQuant").val();
		var imagem = $("#caminho").val();
		var descricao = $("#descricao").val();
		var value = $.trim(imagem);
		if(value.length == 0)
		{
			imagem = "Imagens/semFoto.jpeg";
		}
		var preco = $("#inputPreco").val();
		var codBarra = $("#inputCodBarras").val();

		if(name == null|| quantidade == null || preco == null || codBarra == null){
			alert("Preencha todos os campos!");
		}else{
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://localhost:3000/product/addProduct", true);
			xhr.setRequestHeader("Content-Type", "application/json");

			data = JSON.stringify({
				nome: name,
				codBarra: codBarra,
				preco: preco,
				quantidade: quantidade,
				vendidos: 0,
				imagem: imagem,
				descricao: descricao
			});
			console.log(data);
			xhr.send(data);

			xhr.onreadystatechange = function(){
				if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
					var text = xhr.responseText;
					if(text==="ok"){
						console.log("deu bom");
						alert("Produto cadastrado com sucesso");
						$(".main").load("adminScreen.html");
					}else{
						console.log("deu ruim");
						alert("Erro ao cadastrar");
					}
					console.log(text);
				}
			};
		}
	});
});

document.querySelector("#file3").addEventListener('change', function () {
	const [file] = this.files;
	if (file) {
		var str = "Imagens\\" + file.name;
		$("#caminho").val(str);
	}
});
