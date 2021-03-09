const express = require('express')


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.port;

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
        this.app.listen(this.port, () => console.log('en linea'));
    }

    middlewares() {
        // Directorio público
        this.app.use(express.static('public'));
    }

}

module.exports = Server;