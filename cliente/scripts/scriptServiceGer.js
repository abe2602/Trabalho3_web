$(document).ready(function(){
    var db = indexedDB.open("db", 1);
    let serviceNome = [];
    let servicePreco = [];
    let serviceData = [];
    let dogNome = [];
    let serviceKey = [];

    var i = 0;

    db.onsuccess = function(event){
        db = event.target.result;

        var objectStore = db.transaction("haveService").objectStore("haveService");

        objectStore.openCursor().onsuccess = event => {
            let cursor = event.target.result;
            if (cursor) {
                    dogNome.push(cursor.value.animal);
                    serviceNome.push(cursor.value.service.nome);
                    servicePreco.push(cursor.value.service.preco);
                    serviceData.push(cursor.value.service.data)
                    serviceKey.push(cursor.key);
                    cursor.continue();
            }
            else {
                $("#nomeServicoAnimal").val(dogNome[i]);
                $("#nomeServico").val(serviceNome[i]);
                $("#dataServico").val(serviceData[i]);
                $("#precoServico").val(servicePreco[i]);
            }
            db.close();
        };
    }

    $("#deleteServico").click(function(){
        if(i < 0){
            alert("Não há o que deletar!");
        }else if(serviceKey[i] != undefined){
            var db = indexedDB.open("db", 1);

            db.onsuccess = function(event){
                db = event.target.result;

                var transaction = db.transaction(["haveService"], "readwrite");
                var store = transaction.objectStore("haveService");

                var request = store.delete(serviceKey[i]);

                request.onsuccess = function (e) {
                    alert("Exluido com sucesso");
                    $(".main").load("adminScreen.html");
                }
            };
        }
    });

    $("#atualizarServico").click(function(){
        var db = indexedDB.open("db", 1);

        db.onsuccess = function (event) {
            db = event.target.result;

            var transaction = db.transaction(["haveService"], "readwrite");
            var store = transaction.objectStore("haveService");

            var request = store.get(serviceKey[i]);

            request.onsuccess = function (e) {
                var result = e.target.result;

                result.animal = $("#nomeServicoAnimal").val();
                result.service.nome = $("#nomeServico").val();
                result.service.data = $("#dataServico").val();
                result.preco = $("#precoServico").val();

                store.put(result, serviceKey[i]);
                $(".main").load("adminScreen.html");
            }

            db.close();
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

