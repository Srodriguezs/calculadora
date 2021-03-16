const express = require('express')
const http = require('http');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = http.createServer(this.app);

        // Middlewares
        this.middlewares();


        // Rutas de aplicación
        this.routes();
    }


    routes() {
        this.app.get('/', function(req, res) {
            res.send('Hello World');
        })
    }


    listen() {
        this.server.listen(this.port, () => console.log('en linea'));
    }

    middlewares() {
        // Directorio público
        this.app.use(express.static('public'));
    }

}

module.exports = Server;