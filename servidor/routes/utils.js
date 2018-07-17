var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var Animal = require('../lib/animal');
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


router.post('/defaultData', function(req, res){
     var password = 123;
     var foto = 'Imagens\\perfilAdmin.jpg'
     var nome = 'admin'
     var email = 'admin@admin.com'
     var tel = 1
     var rua = ' '
     var bairro = ' '
     var numCasa = 1
     var bairro = ' '
     var numCartao  = 0
     var bandeiraCartao = ' '
     var isAdmin = true
     var idAdmin = 0

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
          }
          console.log("Usuário cadastrado com sucesso");
          console.log(cadastrarUser);
     });

     password = 123;
     foto = 'Imagens\\perfilFoto.jpg'
     nome = 'Bruno'
     email = 'messengerabe@hotmail.com'
     tel = 2
     rua = 'Que sobe e desce'
     bairro = 'Mas nunca aparece'
     numCasa = 2
     bairro = ' '
     numCartao  = 2
     bandeiraCartao = 'Visa'
     isAdmin = false
     idAdmin = 0

     var cadastrarUserAdmin = new User();
          cadastrarUserAdmin.password = password;
          cadastrarUserAdmin.foto = foto;
          cadastrarUserAdmin.nome = nome;
          cadastrarUserAdmin.email = email;
          cadastrarUserAdmin.tel = tel;
          cadastrarUserAdmin.rua = rua;
          cadastrarUserAdmin.bairro = bairro;
          cadastrarUserAdmin.numCasa = numCasa;
          cadastrarUserAdmin.numCartao = numCartao;
          cadastrarUserAdmin.bandeiraCartao = bandeiraCartao;
          cadastrarUserAdmin.isAdmin = isAdmin;
          cadastrarUserAdmin.idAdmin = idAdmin;

     cadastrarUserAdmin.save(function(erro, save){
          if(erro){
               console.log(erro);
          }
          console.log("Usuário cadastrado com sucesso");
          console.log(cadastrarUserAdmin);
     });

    var dono = 'messengerabe@hotmail.com';
    var idade = 4
    var peso = 4
    var raca = 'Salsicha'
    var racaPai = 'Salsicha'
    var racaMae = 'Salsicha'
    nome = 'Nina'
    foto = 'Imagens\\nina.jpg'

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
          }else{
            console.log("Animal cadastrado com sucesso");
            console.log(cadastrarAnimal);
          }
     });

  nome = 'Ração Golden';
  imagem = 'Imagens\\goldenRacao.jpg'
  var preco = 90;
  var codBarra = 69;
  var quantidade = 35;
  var vendidos = 0;
  var descricao = 'Ração para cachorros.jpg';

  var cadastrarProductDog = new Product();
    cadastrarProductDog.nome = nome; 
    cadastrarProductDog.codBarra = codBarra;
    cadastrarProductDog.preco = preco;
    cadastrarProductDog.quantidade = quantidade;
    cadastrarProductDog.vendidos = vendidos;
    cadastrarProductDog.imagem = imagem;
    cadastrarProductDog.descricao = descricao;
     
     cadastrarProductDog.save(function(erro, save){
          if(erro){
               console.log(erro);
          }
          console.log("Produto cadastrado com sucesso");
          console.log(cadastrarProductDog);
     });

  nome = 'Ração Gran Plus';
  preco = 50;
  imagem = 'Imagens\\gatoRacao2.jpg'
  codBarra = 15;
  quantidade = 17;
  vendidos = 0;
  descricao = 'Ração para gatos';

  var cadastrarProduct = new Product();
    cadastrarProduct.nome = nome; 
    cadastrarProduct.codBarra = codBarra;
    cadastrarProduct.preco = preco;
    cadastrarProduct.quantidade = quantidade;
    cadastrarProduct.vendidos = vendidos;
    cadastrarProduct.imagem = imagem;
    cadastrarProduct.descricao = descricao;
     
     cadastrarProduct.save(function(erro, save){
          if(erro){
               console.log(erro);
          }
          console.log("Produto cadastrado com sucesso");
          console.log(cadastrarProduct);
     });
});


module.exports = router;