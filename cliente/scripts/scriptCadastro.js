$(document).ready(function(){
    $("#inputEmail").change(function(){
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var email = $("#inputEmail").val();
      if( !regex.test(email) ){
        $("#subButtonId").attr('disabled',true);
        $("#subButtonId").attr('style',  'background-color:rgb(100, 100, 100)');
        $("#subButtonId").css( 'cursor', 'default' );
        alert("Por favor, insira um e-mail válido.");
      }
      else{
        $("#subButtonId").attr('disabled',false);
        $("#subButtonId").attr('style',  'background-color:rgb(56, 137, 76)');
        $("#subButtonId").css( 'cursor', 'pointer' );
      }
    });

    $("#subButtonId").click(function(){
        var name = $("#inputName").val();
        var senha = $("#passwordCadastro").val();
        var email = $("#inputEmail").val();
        var telefone = $("#inputTel").val();
        var rua = $("#inputStreet").val();
        var bairro = $("#inputBairro").val();
        var numCasa = $("#inputNumber").val();
        var foto = "Imagens\\unknown.jpg";

        if(name.length == 0 || email.length == 0 || telefone.length == 0 || rua.length == 0 || bairro.length == 0 || numCasa.length == 0 || senha.length == 0){
            alert("Preencha todos os campos, por favor!");
        }else{
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000/user/addUser", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function(){
                console.log(XMLHttpRequest.DONE)
                console.log(this.readyState)

                if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var text = xhr.responseText;
                    if(text==="ok"){
                        console.log("deu bom");
                        alert("Cadastro efetuado com sucesso");
                        $(".main").load("loginScreen.html");
                    }else{
                        console.log("deu ruim");
                        alert("Erro ao cadastrar");
                    }
                    console.log(text);
                }
            };

            data = JSON.stringify({
                password : senha,
                foto : foto,
                nome : name,
                email : email,
                tel : telefone,
                rua: rua,
                bairro: bairro,
                numCasa: numCasa,
                numCartao: "",
                bandeiraCartao: "",
                isAdmin: false,
                idAdmin: 0
            });
            console.log(data);
            xhr.send(data);
        }
    });
});

