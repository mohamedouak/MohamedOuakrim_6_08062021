//On importe express
const express = require('express');
//On importe body-parser
const bodyParser = require('body-parser');
//On importe Mongoose
const mongoose = require('mongoose');
//On importe path
const path = require('path');
//On importe cookie-session
const cookieSession = require('cookie-session');
//On importe helmet
const helmet = require("helmet");

const api = express();

api.use(helmet());

const saucesRoutes = require('./routes/sauces');

const userRoutes = require('./routes/user');

//Création de l'application express
const app = express();

//Connection à mongoDb
mongoose.connect('mongodb+srv://mohamed_59:Tisslane59@cluster0.yorla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

//Fonction middleware qui reçoit et gère la requête et la réponse
//Toutes les demandes peuvent accéder à l'Api 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //Renvoie vers le prochain middleware
    next();
});

//Transforme le corps de la requête en JS utilisable
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;