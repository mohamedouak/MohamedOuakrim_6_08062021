//Token d'authentification 
const jwt = require('jsonwebtoken');

//Fonction qui gère l'authentification
module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'User id non valide';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Requête non authentifiée !')
      });
    }
  };