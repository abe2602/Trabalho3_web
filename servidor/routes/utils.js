var express = require('express');
var router = express.Router();
var User = require('../lib/user');

router.post('/login', function(req, res){
     var email = req.body.email;
     var password = req.body.password;
	 
      console.log("Login - console node")
	 console.log(email);
	 console.log(password);
	 
     User.findOne({email : email, password : password}, function(erro, user){
          console.log(user.isAdmin);
          if(erro){
               return res.status(500).send("erro");
          }
          if(!user){
               return res.status(404).send("erro");
          }
          if(user.isAdmin){
               return res.status(200).send("admin");     
          }else{
               return res.status(200).send("normal");   
          }
     });
});

module.exports = router;