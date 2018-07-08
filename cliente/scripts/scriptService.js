$(document).ready(function(){

    var db = indexedDB.open("db", 1);
    var arrayImagem = [];
    var arrayNome = [];
    var arrayPreco = [];
    var i = 0;

    //Faz a requisição HTTP para o node.js
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/service/listService/", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(null);

    //Espera a resposta do node.js
    xhr.onload = function (){
        var text = xhr.responseText;
        var sizeArrayProduct = JSON.parse(text).length;
        console.log(JSON.parse(text).length);
        console.log(text);

        //Trata a resposta
        if(text==="erro"){
            alert("Erro para achar o servico");
        }else{
            text = text.split("}");
            text.pop();
            console.log(text);
            var list = [];

            for (var k = 0; k < text.length; k++) {
                text[k] = text[k].substr(1) + "}";
                list.push(JSON.parse(text[k]));
            }

            //Coloca a resposta nos vetores utilizados
            for(var j = 0; j < sizeArrayProduct; j++){
                arrayImagem.push(list[j].imagem);
                arrayNome.push(list[j].nome);
                arrayPreco.push(list[j].preco);
            }
            //Coloca o texto nas textBox
            $("#caminho").val(arrayImagem[i]);
            $(".nameService").val(arrayNome[i]);
            $(".precoService").val(arrayPreco[i]);
        }
    };

    $("#nextButtonService").click(function(){
        console.log(i+" "+arrayNome[i].length);

        if(arrayNome[i] != undefined){
            if(i < arrayNome.length - 1 ) {
                i++;
                $("#caminho").val(arrayImagem[i]);
                $(".nameService").val(arrayNome[i]);
                $(".precoService").val(arrayPreco[i]);
            }
        }
    });

    $("#previousButtonService").click(function(){
        console.log(arrayNome[i]);

        if(arrayNome[i] != undefined){
            if(i > 0){
                i = i - 1;
                $("#caminho").val(arrayImagem[i]);
                $(".nameService").val(arrayNome[i]);
                $(".precoService").val(arrayPreco[i]);
            }
        }
    });

    $("#deleteButtonService").click(function(){
        if(i < 0){
            alert("Não há o que deletar!");
        }else if(arrayNome[i] != undefined){
            //Faz a requisição HTTP para o node.js
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", "http://localhost:3000/service/deleteService/" + arrayNome[i], true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function (){
                if(this.readyState == xhr.DONE){
                    console.log("Excluido com sucesso");
                    alert("Excluido com sucesso");
                    $(".main").load("adminScreen.html");
                }
            };
            xhr.send(null);
        }
    });

    $("#saveButtonService").click(function(){
        console.log(arrayNome[i]);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3000/service/updateService/" + arrayNome[i], true);
        xhr.setRequestHeader("Content-Type", "application/json");

        var data = JSON.stringify({
            nome: $(".nameService").val(),
            preco: $(".precoService").val(),
            imagem:  $("#caminho").val(),
            data: " "
        });

        console.log(data);
        xhr.send(data);

        xhr.onreadystatechange = function (){
            var text = xhr.responseText;

            if(this.readyState == xhr.DONE){
                if(text==="ok"){
                    alert("Atualização concluida");
                    $(".main").load("adminScreen.html");
                }else{
                    alert("Erro na alteração");
                }
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
