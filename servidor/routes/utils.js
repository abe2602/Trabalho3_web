var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var Service = require('../lib/service');
var Product = require('../lib/product');
var haveService = require('../lib/haveService');

router.post('/login', function(req, res){
     var email = req.body.email;
     var password = req.body.password;
	 
      console.log("Login - console node")
      console.log(email);
      console.log(password);
	 
     User.findOne({email : email, password : password}, function(erro, user){
          if(erro){
            console.log("ENTREI AQUI deu pau");
               return res.status(500).send("erro");
          }else if(!user){
            console.log("ENTREI AQUI user incorreto");
               return res.status(404).send("erro");
          }else if(user.isAdmin && user.password == password){
               return res.status(200).send("admin");     
          }else if(user.password == password){
               return res.status(200).send("normal");   
          }else{
            return res.status(404).send("erro");
          }
     });
});

router.post('/haveService', function(req, res){
     console.log("HaveService - Log");
     var newHaveService = new haveService();
          newHaveService.animal = req.body.animal;
          newHaveService.nome = req.body.nome;
          newHaveService.data = req.body.data;
          newHaveService.preco = req.body.preco;
          newHaveService.imagem = req.body.imagem;

     newHaveService.save(function(erro, save){
          if(erro){
               console.log(erro);
               return res.status(500).send();
          }
          console.log("HaveService cadastrado com sucesso");
          return res.status(200).send("ok");
     });

});

router.get('/listProduct', function(req, res){

  console.log('Estoque - console do node');
  Product.find({}, function(erro, product){
    if(erro){
      console.log(erro);
      res.status(404).send(erro);
    }else{
      console.log(product);
      res.status(200).send(product);
    }
  })
});


router.get('/getAnimalService/:dogName', function(req, res){
     console.log("HaveService get - Log");
     var dogName = req.params.dogName;
     
     haveService.find({animal: dogName}, function(erro, service){
         if(erro){
           console.log(erro);
           res.status(404).send(erro);
         }else if(!service){
          res.status(404).send(erro);
         }
         else{
           console.log(service);
           res.status(200).send(service);
         }
     })
});


router.put('/buyStuff/:idProduto', function(req, res){
     var idProduto = req.params.idProduto;
     
     Product.findOne({codBarra: idProduto} , function(erro, compra){
          if(erro){
               console.log("Algum erro aconteceu");
          }else{
               compra.quantidade = compra.quantidade - req.body.quantidade;
               
               compra.save(function(erro, newCompra){
                    if(erro){
                      res.status(404).send(erro);
                    }else{
                      res.status(200).send("ok");
                    }
               });
          }
     })
});

router.get('/listHaveService', function(req, res){

  console.log('Servicos marcados - console do node');
  haveService.find({}, function(erro, service){
    if(erro){
      res.status(404).send(erro);
    }else{
      console.log(service);
      res.status(200).send(service);
    }
  })
});

router.delete('/deleteHaveService', function(req, res){

  console.log('Servicos marcados - console do node');
  haveService.find({}, function(erro, service){
    if(erro){
      res.status(404).send(erro);
    }else{
      console.log(service);
      res.status(200).send(service);
    }
  })
});

router.put('/updateHaveService/:id', function(req, res){
  var id = req.params.id;

  console.log('Atualizando produtos - console do node');

    haveService.findOne({_id: id}, function(erro, service){
      if(erro){
        res.status(404).send(erro);
      }else{
        service.animal = req.body.animal;
        service.preco = req.body.preco;
        service.data = req.body.data;
        service.nome = req.body.nome;

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