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
		var codBarras = $("#inputCodBarras").val();

		if(name == null|| quantidade == null || preco == null || codBarras == null){
			alert("Preencha todos os campos!");
		}else{
			var db = indexedDB.open("db", 1);

			db.onsuccess = function(event){
				db = event.target.result;

				var transaction = db.transaction(["product"], "readwrite");

				var store = transaction.objectStore("product");
				var product = {
					nome: name,
					quantidade: quantidade,
					imagem: imagem,
					preco:preco,
					descricao:descricao,
					codigoBarra: codBarras
				};

				var request = store.add(product);

				request.onsuccess = function(w){
					console.log("cadastrado com sucesso");
					$(".main").load("adminScreen.html");
				}
				db.close();
			}
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
