//On importe le package http de node
const http = require('http');

//On importe notre application (app.js)
const app = require('./app');

//Fonction qui renvoie un port valide (sous forme de string ou number)
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

  //Port utilisé
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
  //Fonction qui reçoit les erreurs et les gère pour ensuite être enregistrée dans le serveur
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  //On passe à notre serveur l'application créée
  const server = http.createServer(app);
  
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
  //On écoute le port
  server.listen(port);
  
