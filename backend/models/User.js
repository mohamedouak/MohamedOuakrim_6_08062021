const mongoose = require('mongoose');
//Package pour éviter d'utiliser plusieurs fois la même adresse
const uniqueValidator = require('mongoose-unique-validator');

//Schéma type d'un utilisateur
const userSchema = mongoose.Schema({    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//On applique le plugin au schéma utilisateur
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);