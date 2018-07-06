$(document).ready(function(){
    if(loginAux != null){
        var db = indexedDB.open("db", 1);

        db.onsuccess = function(event){
            db = event.target.result;

            var transaction = db.transaction(["usuarios"], "readwrite");
            var store = transaction.objectStore("usuarios");

                var request = store.get(loginAux);

            request.onsuccess = function(e){
                var result = e.target.result;

                $(".nomeUser").val(result.nome);
                $(".emailUser").val(result.email);
                $(".telUser").val(parseInt(result.telefone));
                $(".streetUser").val(result.rua);
                $(".numCasaUser").val(parseInt(result.numCasa));
                $(".bairroUser").val(result.bairro);
                $("#borderFoto1").attr("src", result.foto);
            }
            db.close();
        }
    }

    $("#addUser").click(function(){
        $(".main").load("cadastroScreenByAdmin.html");
    });

    $("#addProduct").click(function(){
        $(".main").load("addProductScreen.html");
    });

    $("#addService").click(function(){
        $(".main").load("addServiceScreen.html");
    });

    $("#Estoque").click(function(){
        $(".main").load("estoqueScreen.html");
    });

    $("#Service").click(function(){
        $(".main").load("serviceScreen.html");
    });

    $("#btOut").click(function(){
        $("#loginScreen").text("Entrar");
        loginAux = null;
	
        $("#loginScreen").click(function(){
            $(".main").load("loginScreen.html");
        });
        $(".main").load("initialScreen.html");
    });

    $("#gerService").click(function(){
        $(".main").load("serviceGerScreen.html");
    });

    $("#btSave").click(function(){

        var name, email, tel, street, numCasa, bairro;
        var db = indexedDB.open("db", 1);

        db.onsuccess = function (event) {
            db = event.target.result;

            var transaction = db.transaction(["usuarios"], "readwrite");
            var store = transaction.objectStore("usuarios");

            if(loginAux != null) {
                var request = store.get(loginAux);

                request.onsuccess = function (e) {
                    var result = e.target.result;

                    result.nome = $(".nomeUser").val();
                    result.telefone = $(".telUser").val();
                    result.rua = $(".streetUser").val();
                    result.numCasa = $(".numCasaUser").val();
                    result.bairro = $(".bairroUser").val();
                    result.foto = $("#borderFoto1").attr("src");

                    store.put(result);
                }
                db.close();
            }
        }
    });

});

/* Altera foto da conta do admin */
document.querySelector("#file2").addEventListener('change', function () {
    const [file] = this.files;
    if (file) {
        var str = "Imagens\\" + file.name;
        $("#borderFoto1").attr("src", str);
    }
});
