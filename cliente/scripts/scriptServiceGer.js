$(document).ready(function(){
    var db = indexedDB.open("db", 1);
    let serviceNome = [];
    let servicePreco = [];
    let serviceData = [];
    let dogNome = [];
    let serviceKey = [];
    var i = 0;

    //Faz a requisição HTTP para o node.js
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/utils/listHaveService/", true);
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
                dogNome.push(list[j].animal);
                serviceNome.push(list[j].nome);
                servicePreco.push(list[j].preco);
                serviceData.push(list[j].data);
                serviceKey.push(list[j]._id);
            }
            //Coloca o texto nas textBox
            $("#nomeServicoAnimal").val(dogNome[i]);
            $("#nomeServico").val(serviceNome[i]);
            $("#dataServico").val(serviceData[i]);
            $("#precoServico").val(servicePreco[i]);
        }
    };

    $("#deleteServico").click(function(){
        if(i < 0){
            alert("Não há o que deletar!");
        }else if(serviceKey[i] != undefined){
            //Faz a requisição HTTP para o node.js
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", "http://localhost:3000/utils/deleteHaveService/" + serviceKey[i], true);
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

    $("#atualizarServico").click(function(){
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3000/utils/updateHaveService/" + serviceKey[i], true);
        xhr.setRequestHeader("Content-Type", "application/json");

        var data = JSON.stringify({
            nome: $("#nomeServico").val(),
            animal: $("#nomeServicoAnimal").val(),
            preco:  $("#precoServico").val(),
            data: $("#dataServico").val()
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

    $("#previousServico").click(function(){
        console.log("previous");

        if(serviceKey[i] != undefined){
            if(i > 0){
                i = i - 1;

                $("#nomeServicoAnimal").val(dogNome[i]);
                $("#nomeServico").val(serviceNome[i]);
                $("#dataServico").val(serviceData[i]);
                $("#precoServico").val(servicePreco[i]);
            }
        }
    });

    $("#nextServico").click(function(){
        console.log("");

        if(serviceKey[i] != undefined){
            if(i < serviceKey.length - 1) {
                i++;

                $("#nomeServicoAnimal").val(dogNome[i]);
                $("#nomeServico").val(serviceNome[i]);
                $("#dataServico").val(serviceData[i]);
                $("#precoServico").val(servicePreco[i]);
            }
        }
    });

});

