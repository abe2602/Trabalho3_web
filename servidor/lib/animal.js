var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
     dono : {type : String},
     nome : {type : String},
     idade : {type : Number},
     peso : {type : Number},
     raca : {type : String},
     racaPai : {type : String},
     racaMae : {type : String},
     foto : {type : String, default:''}
})

var Animal = mongoose.model('animals', animalSchema);
module.exports = Animal;
