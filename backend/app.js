//On importe le framework Express
const express = require('express');
//On importe le package mongoose (pour l'intéraction avec la BDD)
const mongoose = require('mongoose');
//On importe path pour avoir accès au système de fichier
const path = require('path');
//On importe helmet pour la configuration de nos en-têtes http
const helmet = require('helmet');
//Fichier .env pour sécuriser les données sensibles et qu'elles ne soient pas visibles
const dotenv = require('dotenv').config();

const saucesRoutes = require('./routes/sauces');

const userRoutes = require('./routes/user');

//Création de l'application express
const app = express();

//Connection à mongoDb
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })   
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

//Fonction middleware qui reçoit et gère la requête et la réponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //Renvoie vers le prochain middleware
    next();
});

//Transforme le corps de la requête en JS utilisable
app.use(express.json());
app.use(helmet());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
