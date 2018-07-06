$(document).ready(function(){
    $("#submitAnimalButton").click(function(){
        var name = $("#nomeAnimal").val();
        var idade = $("#idadeAnimal").val();
        var peso = $("#pesoAnimal").val();
        var raca = $("#racaAnimal").val();
        var racaPai = $("#racaPai").val();
        var racaMae = $("#racaMae").val();
        var foto = "Imagens\\unknown.jpg";

        if(name.length == 0 || idade.length == 0 || peso.length == 0 || raca.length == 0 || racaPai.length == 0 || racaMae.length == 0){
            alert("Preencha todos os campos, por favor!");
        }else{
            var db = indexedDB.open("db", 1);

            db.onsuccess = function(event){
                db = event.target.result;

                var transaction = db.transaction(["animais"], "readwrite");

                var store = transaction.objectStore("animais");
                var animal = {
                    dono: loginAux,
                    nome: name,
                    idade: idade,
                    peso: peso,
                    raca: raca,
                    racaMae: racaMae,
                    racaPai: racaPai,
                    foto: foto
                };

                var request = store.add(animal);

                request.onsuccess = function(w){
                    console.log("Animal cadastrado com sucesso");
                    $(".main").load("accountScreen.html");
                }

                request.onerror = function(e){
                    console.log(e);
                    console.log("bah, morreu");
                }
                db.close();
            }
        }
    });
});
