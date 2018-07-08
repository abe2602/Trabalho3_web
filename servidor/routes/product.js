var express = require('express');
var router = express.Router();
var Product = require('../lib/product');

router.get('/listProduct', function(req, res){

  console.log('Estoque - console do node');
  Product.find({}, function(erro, product){
    if(erro){
      res.status(404).send(erro);
    }else{
      console.log(product);
      res.send(product);
    }
  })
});

router.post('/addProduct', function(req, res){
	var nome = req.body.nome;
	var codBarra = req.body.codBarra;
	var preco = req.body.preco;
	var quantidade = req.body.quantidade;
	var vendidos = req.body.vendidos;
	var imagem = req.body.imagem;
	var descricao = req.body.descricao;

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
               return res.status(500).send();
          }
          console.log("Produto cadastrado com sucesso");
          console.log(cadastrarProduct);
          return res.status(200).send("ok");
     });
});

router.put('/updateProduct/:codBarra', function(req, res){
	var codBarra = req.params.codBarra;

	console.log('Atualizando produtos - console do node');
  	console.log(req.body.nome);

    Product.findOne({codBarra: codBarra}, function(erro, product){
      if(erro){
        res.status(404).send(erro);
      }else{
        product.nome = req.body.nome;
        product.preco = req.body.preco;
        product.quantidade = req.body.quantidade;
        product.imagem = req.body.imagem;
        product.descricao = req.body.descricao;

        product.save(function(erro, newProduct){
          if(erro){
            res.status(404).send(erro);
          }else{
            res.send("ok");
          }
        });
      }
    })

});

router.delete('/deleteProduct/:codBarra', function(req, res){
  var codBarra = req.params.codBarra;

  console.log('Excluindo produto- console do node');
  console.log(codBarra);

  Product.findOneAndRemove({codBarra: codBarra}, function(erro, produto){
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
module.exports = router;