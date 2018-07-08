var mongoose = require('mongoose');

var haveServiceSchema = new mongoose.Schema({
     animal : {type : String},
     nome : {type : String},
     preco : {type : Number},
     imagem : {type : String, default: ''},
     data : {type : Date}
})

var haveService = mongoose.model('haves', haveServiceSchema);
module.exports = haveService;
