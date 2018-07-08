$(document).ready(function(){

    var db = indexedDB.open("db", 1);
    var arrayCod = [];
    var arrayImagem = [];
    var arrayNome = [];
    var arrayPreco = [];
    var arrayQuant = [];
    var arrayDesc = [];
    var i = 0;

    //Faz a requisição HTTP para o node.js
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/product/listProduct/", true);
    xhr.setRequestHeader("Content-Type", "application/json");

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
                arrayCod.push(list[j].codBarra);
                arrayImagem.push(list[j].imagem);
                arrayNome.push(list[j].nome);
                arrayPreco.push(list[j].preco);
                arrayQuant.push(list[j].quantidade);
                arrayDesc.push(list[j].descricao);
            }
            //Coloca o texto nas textBox
            $("#caminho").val(arrayImagem[i]);
            $(".codProduct").val(arrayCod[i]);
            $(".nameProduct").val(arrayNome[i]);
            $(".precoProduct").val(arrayPreco[i]);
            $(".quantidadeProduct").val(arrayQuant[i]);
            $(".descricaoProduct").val(arrayDesc[i]);
        }
    };

    xhr.send(null);

    $("#nextButtonEstoque").click(function(){
        console.log(i+" "+arrayCod[i].length);

        if(arrayCod[i] != undefined){
            if(i < arrayNome.length - 1 ) {
                i++;
                $("#caminho").val(arrayImagem[i]);
                $(".codProduct").val(arrayCod[i]);
                $(".nameProduct").val(arrayNome[i]);
                $(".precoProduct").val(arrayPreco[i]);
                $(".quantidadeProduct").val(arrayQuant[i]);
                $(".descricaoProduct").val(arrayDesc[i]);
            }
        }
    });

    $("#previousButtonEstoque").click(function(){
        console.log(arrayCod[i]);

        if(arrayCod[i] != undefined){
            if(i > 0){
                i = i - 1;
                $("#caminho").val(arrayImagem[i]);
                $(".codProduct").val(arrayCod[i]);
                $(".nameProduct").val(arrayNome[i]);
                $(".precoProduct").val(arrayPreco[i]);
                $(".quantidadeProduct").val(arrayQuant[i]);
                $(".descricaoProduct").val(arrayDesc[i]);
            }
        }
    });

    $("#deleteButtonEstoque").click(function(){
        if(i < 0){
            alert("Não há o que deletar!");
        }else if(arrayCod[i] != undefined){
            //Faz a requisição HTTP para o node.js
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", "http://localhost:3000/product/deleteProduct/" + arrayCod[i], true);
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

    $("#saveButtonEstoque").click(function(){
        console.log(arrayCod[i]);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3000/product/updateProduct/" + arrayCod[i], true);
        xhr.setRequestHeader("Content-Type", "application/json");

        var data = JSON.stringify({
            nome: $(".nameProduct").val(),
            codBarra: $(".codProduct").val(),
            preco: $(".precoProduct").val(),
            quantidade: $(".quantidadeProduct").val(),
            vendidos: 0,
            imagem:  $("#caminho").val(),
            descricao: $(".descricaoProduct").val()
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
