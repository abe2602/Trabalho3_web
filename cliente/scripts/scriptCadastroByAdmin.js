$(document).ready(function(){
        $("#subButtonId").click(function(){
            var name = $("#inputName").val();
            var senha = $("#passwordCadastro").val();
            var email = $("#inputEmail").val();
            var telefone = $("#inputTel").val();
            var rua = $("#inputStreet").val();
            var bairro = $("#inputBairro").val();
            var numCasa = $("#inputNumber").val();
            var typeUser = $("#inputType").val();

            if(name.length == 0 || email.length == 0 || telefone.length == 0 || rua.length == 0 || bairro.length == 0 || numCasa.length == 0 || senha.length == 0 || typeUser.length == 0){
                alert("Preencha todos os campos, por favor!");
            }else{
                var db = indexedDB.open("db", 1);

                db.onsuccess = function(event){
                    db = event.target.result;

                    var transaction = db.transaction(["usuarios"], "readwrite");
                    var store = transaction.objectStore("usuarios");

                    var user = {nome: name,
                        senha: senha,
                        email:email,
                        telefone:telefone,
                        rua: rua,
                        bairro: bairro,
                        numCasa: numCasa,
                        numCartao:null,
                        bandeiraCartao:null,
                        tipoUser: typeUser
                    };

                    var request = store.add(user);

                    request.onsuccess = function(w){
                        console.log("cadastrado com sucesso");
                    }

                    request.onerror = function(e){
                        console.log(e);
                    }
                    db.close();
                }
            }
        });
});