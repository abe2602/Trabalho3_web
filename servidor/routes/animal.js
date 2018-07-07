var express = require('express');
var router = express.Router();
var Animal = require('../lib/animal');

router.post('/addAnimal', function(req, res){
    var dono = req.body.dono;
    var nome = req.body.nome;
    var idade = req.body.idade;
    var peso = req.body.peso;
    var raca = req.body.raca;
    var racaPai = req.body.racaPai;
    var racaMae = req.body.racaMae;
    var foto = req.body.foto;

	var cadastrarAnimal = new Animal();
		cadastrarAnimal.foto = dono;
		cadastrarAnimal.nome = nome;
		cadastrarAnimal.idade = idade;
		cadastrarAnimal.peso = peso;
		cadastrarAnimal.raca = raca;
		cadastrarAnimal.racaPai = racaPai;
		cadastrarAnimal.racaMae = racaMae;
		cadastrarAnimal.foto = foto;

		console.log(cadastrarAnimal);
     cadastrarAnimal.save(function(erro, save){
          if(erro){
               console.log(erro);
               console.log("Algo de errado aconteceu")
               return res.status(500).send();
          }else{
          	console.log("Animal cadastrado com sucesso");
          	console.log(cadastrarAnimal);
          	return res.status(200).send("ok");
          }
     });
});

router.get('/listAnimal', function(req, res){
  var Animal= [];
  
  Animal.find({}, function(erro, animal){

  })
});

module.exports = router;