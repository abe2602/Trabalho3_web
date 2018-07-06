$(document).ready(function(){

    var db = indexedDB.open("db", 1);
    var arrayImagem = [];
    var arrayNome = [];
    var arrayPreco = [];
    var i = 0;

    db.onsuccess = function(event) {
        db = event.target.result;

        var objectStore = db.transaction("service").objectStore("service");

        objectStore.openCursor().onsuccess = event => {
            let cursor = event.target.result;
            if (cursor) {
                arrayImagem.push(cursor.value.imagem);
                arrayNome.push(cursor.value.nome);
                arrayPreco.push(cursor.value.preco);
                cursor.continue();
            }
            else {
                $("#caminho").val(arrayImagem[i]);
                $(".nameService").val(arrayNome[i]);
                $(".precoService").val(arrayPreco[i]);

                console.log(arrayNome[i]);
            }
            db.close();
        }
    }

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
            var db = indexedDB.open("db", 1);

            db.onsuccess = function(event){
                db = event.target.result;

                var transaction = db.transaction(["service"], "readwrite");
                var store = transaction.objectStore("service");

                var request = store.delete(arrayNome[i]);

                request.onsuccess = function (e) {
                    alert("Exluido com sucesso");
                    $(".main").load("adminScreen.html");
                }
            };
        }
    });

    $("#saveButtonService").click(function(){
        var db = indexedDB.open("db", 1);

        db.onsuccess = function (event) {
            db = event.target.result;

            var store = db.transaction(["service"], "readwrite").objectStore("service");
            var request = store.get(arrayNome[i]);

            request.onsuccess = function (e) {
                var result = e.target.result;
                result.imagem = $("#caminho").val();
                result.nome =  $(".nameProduct").val();
                result.preco = $(".precoProduct").val();

                store.put(result);
		          alert("Service Salvo!");
            }
            db.close();
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
