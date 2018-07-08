var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
     nome : {type : String},
     codBarra : {type : Number, unique:true},
     preco : {type : Number},
     quantidade : {type : Number},
     vendidos: {type: Number},
     imagem : {type : String, default: ''},
     descricao : {type : String}
})

var Product = mongoose.model('products', productSchema);
module.exports = Product;
