$(document).ready(function(){
	$("#subButtonId").click(function(){
        var name = $("#inputNameService").val();
        var data = $("#inputDateService").val();
        var imagem = $("#inputImageService").val();
	    var value = $.trim(imagem);
        var preco = $("#inputPrecoService").val();

        if(value.length == 0) {
            imagem = "Imagens/semFoto.jpeg";
        }

        if(name == null || preco == null || data == null){
            alert("Preencha todos os campos!");
        }else{
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000/service/addService", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            data = JSON.stringify({
                nome: name,
                preco: preco,
                imagem: imagem,
                data: data
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

document.querySelector("#file4").addEventListener('change', function () {
    const [file] = this.files;
    if (file) {
        var str = "Imagens\\" + file.name;
        $("#inputImageService").val(str);
    }
});
