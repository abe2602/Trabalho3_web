var express = require('express');
var router = express.Router();
var Service = require('../lib/service');

router.post('/addService', function(req, res){
	var nome = req.body.nome;
	var preco = req.body.preco;
	var imagem = req.body.imagem;
	var data = req.body.data;

	var cadastrarService = new Service();
		cadastrarService.nome = nome; 
		cadastrarService.preco = preco;
		cadastrarService.imagem = imagem;
		cadastrarService.data = data;
     
     cadastrarService.save(function(erro, save){
          if(erro){
               console.log(erro);
               return res.status(500).send();
          }
          console.log("Serviço cadastrado com sucesso");
          console.log(cadastrarService);
          return res.status(200).send("ok");
     });
});

router.get('/listService', function(req, res){

  console.log('Servicos disponiveis - console do node');
  Service.find({}, function(erro, service){
    if(erro){
      res.status(404).send(erro);
    }else{
      console.log(service);
      res.status(200).send(service);
    }
  })
});

router.put('/updateService/:nomeService', function(req, res){
	var nomeService = req.params.nomeService;

	console.log('Atualizando produtos - console do node');
  	console.log(nomeService);

    Service.findOne({nome: nomeService}, function(erro, service){
      if(erro){
        res.status(404).send(erro);
      }else{
        service.preco = req.body.preco;
        service.imagem = req.body.imagem;

        service.save(function(erro, newService){
          if(erro){
            res.status(404).send(erro);
          }else{
            res.status(200).send("ok");
          }
        });
      }
    })
});

module.exports = router;