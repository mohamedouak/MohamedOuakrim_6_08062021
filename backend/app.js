//On importe express
const express = require('express');

//On importe body-parser
const bodyParser = require('body-parser');

//On importe Mongoose
const mongoose = require('mongoose');

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
app.use(bodyParser.json());

//Fonction qui va gérer les requêtes POST
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
});

//On passe en argument l'URL visée par l'application frontend (Route d'Api)
app.use('/api/stuff', (req, res, next) => {

    //Tableau d'objet
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];

    //Réponse réussie, envoie du tableau d'objet stuff
    res.status(200).json(stuff);
});

module.exports = app;