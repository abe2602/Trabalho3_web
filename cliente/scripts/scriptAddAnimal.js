$(document).ready(function(){
    $("#submitAnimalButton").click(function(){
        var nome = $("#nomeAnimal").val();
        var idade = $("#idadeAnimal").val();
        var peso = $("#pesoAnimal").val();
        var raca = $("#racaAnimal").val();
        var racaPai = $("#racaPai").val();
        var racaMae = $("#racaMae").val();
        var foto = "Imagens\\unknown.jpg";

        if(nome.length == 0 || idade.length == 0 || peso.length == 0 || raca.length == 0 || racaPai.length == 0 || racaMae.length == 0){
            alert("Preencha todos os campos, por favor!");
        }else{
            try{
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/animal/addAnimal", true);
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onreadystatechange = function(){
                    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                        var text = xhr.responseText;
                        if(this.readyState == XMLHttpRequest.DONE && this.status == 200 && text==="ok"){
                            console.log("Animal Adicionado com sucesso");
                            alert("Cadastro efetuado com sucesso");
                            $(".main").load("accountScreen.html");
                        }else{
                            console.log("deu ruim");
                            alert("Erro ao cadastrar");
                        }
                    }
                };
                var data = JSON.stringify({
                    dono : loginAux,
                    nome : nome,
                    idade : idade,
                    peso : peso,
                    raca : raca,
                    racaPai : racaPai,
                    racaMae : racaMae,
                    foto : foto
                });
                console.log(data);
                xhr.send(data);
            }catch(err){
                console.log(err.message);
            }
        }
    });
});
