//Package pour gérer les fichiers entrants dans nos requêtes http
const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Fonction qui indique à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/\.[^/.]+$/, "");
    console.log(name);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');