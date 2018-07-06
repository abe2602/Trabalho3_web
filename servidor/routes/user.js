var express = require('express');
var router = express.Router();
var User = require('../lib/user');

router.post('/addUser', function(req, res){
     var password = req.body.password;
     var foto = req.body.photo;
     var nome = req.body.name;
     var email = req.body.email;
     var tel = req.body.tel;
     var rua = req.body.rua;
     var bairro = req.body.bairro;
     var numCasa = req.body.numCasa;
     var numCartao = req.body.numCartao;
     var isAdmin = req.body.isAdmin;
     var idAdmin = req.body.idAdmin;

     var cadastrarUser = User();
          cadastrarUser.password = password;
          cadastrarUser.foto = foto;
          cadastrarUser.nome = nome;
          cadastrarUser.email = email;
          cadastrarUser.tel = tel;
          cadastrarUser.rua = rua;
          cadastrarUser.bairro = bairro;
          cadastrarUser.numCasa = numCasa;
          cadastrarUser.numCartao = numCartao;
          cadastrarUser.isAdmin = isAdmin;
          cadastrarUser.idAdmin = idAdmin;

     cadastrarUser.save(function(erro, save){
          if(erro){
               console.log(erro);
               return res.status(500).send();
          }
          console.log("Deu bom :D");
          return res.status(200).send("ok");
     });
});

module.exports = router;