$(document).ready(function(){
    if(loginAux.length != 0){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/user/getUserData/" + loginAux, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function (){
            var text = xhr.responseText;
            console.log(JSON.parse(text).length);
            console.log(text);

            if(text==="erro"){
                alert("Erro para achar o servico");
            }else if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                text = text.split("}");
                text.pop();

                console.log(text);
                var list = [];

                for (var i = 0; i < text.length; i++) {
                    text[i] = text[i].substr(1) + "}";
                    list.push(JSON.parse(text[i]));
                }

                $(".nomeUser").val(list[0].nome);
                $(".emailUser").val(list[0].email);
                $(".telUser").val(list[0].tel);
                $(".streetUser").val(list[0].rua);
                $(".numCasaUser").val(list[0].numCasa);
                $(".bairroUser").val(list[0].bairro);
                $(".borderFoto1").attr("src", list[0].foto);
            }
        };
        xhr.send(null);
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
        nome = $(".nomeUser").val();
        tel = $(".telUser").val();
        rua = $(".streetUser").val();
        numCasa = $(".numCasaUser").val();
        bairro = $(".bairroUser").val();
        foto = $("#borderFoto1").attr("src");

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3000/user/updateUser/" + loginAux, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        data = JSON.stringify({
            password : " ",
            foto : foto,
            nome : nome,
            email : loginAux,
            tel : tel,
            rua: rua,
            bairro: bairro,
            numCasa: numCasa,
            numCartao: " ",
            bandeiraCartao: " "
        });

        console.log(data);
        xhr.send(data);

        xhr.onreadystatechange = function (){
            var text = xhr.responseText;

            if(this.readyState == xhr.DONE){
                if(text==="ok" && this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    alert("Atualização concluida");
                }else{
                    alert("Erro na alteração");
                }
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
