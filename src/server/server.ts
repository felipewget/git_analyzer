import express from 'express';
import mongoose from 'mongoose';
import config from './config';

import crawlerRoutes from './../app/routes/crawlerRoutes'
import authRoutes from './../app/routes/authRoutes'
import userRoutes from './../app/routes/userRoutes'


class Server {

    app: express.Application;

    cors_whitelist: Array<string> = config.cors_whitelist;

    constructor()
    {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    async middlewares()
    {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        await mongoose.connect(`mongodb://${config.mongo_db.host}:${config.mongo_db.port}/${config.mongo_db.db_name}`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch( function(){
            console.log('Erro ao conectar ao SGBD')
        });
    }

    routes()
    {
        this.app.use('/', crawlerRoutes);
        this.app.use('/', authRoutes);
        this.app.use('/', userRoutes);
    }

}

export default new Server().app;