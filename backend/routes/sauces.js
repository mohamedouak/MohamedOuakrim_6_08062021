const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

  //Crée l'objet
  router.post('/', auth, multer, saucesCtrl.createSauce);  
  //Modifie l'objet
  router.put('/:id', auth, multer, saucesCtrl.modifySauce);  
  //Supprime l'objet
  router.delete('/:id', auth, saucesCtrl.deleteSauce);
  //Liker ou disliker
  router.post('/:id/like', auth, saucesCtrl.likeOrDislike);
  //Récupérer un objet
  router.get('/:id', auth, saucesCtrl.getOneSauce);  
  //Récupérer tous les objets
  router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;