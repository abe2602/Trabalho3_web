var express = require('express');
var router = express.Router();
var User = require('../lib/user');

router.post('/addUser', function(req, res){
     var password = req.body.password;
     var foto = req.body.foto;
     var nome = req.body.nome;
     var email = req.body.email;
     var tel = req.body.tel;
     var rua = req.body.rua;
     var bairro = req.body.bairro;
     var numCasa = req.body.numCasa;
     var numCartao = req.body.numCartao;
     var bandeiraCartao = req.body.bandeiraCartao;
     var isAdmin = req.body.isAdmin;
     var idAdmin = req.body.idAdmin;

     var cadastrarUser = new User();
          cadastrarUser.password = password;
          cadastrarUser.foto = foto;
          cadastrarUser.nome = nome;
          cadastrarUser.email = email;
          cadastrarUser.tel = tel;
          cadastrarUser.rua = rua;
          cadastrarUser.bairro = bairro;
          cadastrarUser.numCasa = numCasa;
          cadastrarUser.numCartao = numCartao;
          cadastrarUser.bandeiraCartao = bandeiraCartao;
          cadastrarUser.isAdmin = isAdmin;
          cadastrarUser.idAdmin = idAdmin;
     
     cadastrarUser.save(function(erro, save){
          if(erro){
               console.log(erro);
               return res.status(500).send();
          }
          console.log("Usuário cadastrado com sucesso");
          console.log(cadastrarUser);
          return res.status(200).send("ok");
     });
});

router.get('/getUserData/:email', function(req, res){
     var email = req.params.email;
     
     User.find({email: email} , function(erro, foundUser){
          if(erro){
               console.log("Algum erro aconteceu");
          } 
          if(!foundUser){
               console.log("Usuario nao identificado");
          }else{
               console.log(foundUser);
               return res.send(foundUser)
          }
     })
});


module.exports = router;