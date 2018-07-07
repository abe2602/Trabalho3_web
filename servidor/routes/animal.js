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
		cadastrarAnimal.dono = dono;
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

router.get('/listAnimal/:dono', function(req, res){
  var dono = req.params.dono;
  var animalList = [];

  console.log('Listando animais - console do node');
  Animal.find({dono: dono}, function(erro, animal){
    if(erro){
      res.status(404).send(erro);
    }else{
      console.log(animal);
      res.send(animal);
    }
  })
});

router.delete('/deleteAnimal/:id', function(req, res){
  var id = req.params.id;

  console.log('Excluindo - console do node');
  console.log(id);

  Animal.findOneAndRemove({_id: id}, function(erro, animal){
    if(erro){
      console.log("deu ruim ;-;");
      console.log(erro)
      res.status(404).send();
    }else{
      console.log("deu bom");
      res.send("ok");
    }
  })
});

router.put('/updateAnimal/:id', function(req, res){
  var id = req.params.id;

  console.log('Atualizando animais - console do node');
  console.log(req.body.nome);
  
    Animal.findOne({_id: id}, function(erro, animal){
      if(erro){
        res.status(404).send(erro);
      }else{
        animal.dono = req.body.dono;
        animal.nome = req.body.nome;
        animal.idade = req.body.idade;
        animal.peso = req.body.peso;
        animal.raca = req.body.raca;
        animal.racaPai = req.body.racaPai;
        animal.racaMae = req.body.racaMae;
        animal.foto = req.body.foto;
      
        animal.save(function(erro, newAnimal){
          if(erro){
            res.status(404).send(erro);
          }else{
            res.send("ok");
          }
        });
      }
    })
});

module.exports = router;