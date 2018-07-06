var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
     email : {type : String, unique: true},
     password : {type : String},
     foto : {type : String, default : ''},
     nome : {type : String},
     tel : {type : Number},
     rua : {type : String},
     bairro : {type : String},
     numCasa : {type : Number},
     numCartao : {type : Number},
     bandeiraCartao: {type: String},
     isAdmin : {type : Boolean, default : false},
     idAdmin : {type : Number}
})

var User = mongoose.model('users', userSchema);
module.exports = User;
