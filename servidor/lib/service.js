var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
     nome : {type : String, unique: true},
     preco : {type : Number},
     imagem : {type : String, default: ''},
     data : {type : Date}
})

var Service = mongoose.model('services', serviceSchema);
module.exports = Service;
