import express from 'express';
import * as cluster from 'cluster';
import * as os from 'os';

class Cluster {

    app: express.Application;
    port: number;
    count_cores: number;

    constructor( app: express.Application, port: number )
    {

        this.app         = app;
        this.port        = port;
        this.count_cores = os.cpus().length;

        this.upServer();

    }

    upServer(): void
    {

        if (cluster.isMaster) {

            console.log(`Master (proccess ${process.pid}) is running | This machine there are ${this.count_cores} cores`);

            for (let i = 0; i < this.count_cores; i++) {
                cluster.fork();
            }
            
        } else {
        
            // var server = 
            this.app.listen( this.port, (): void => {
                console.log(`Server on | Port: ${this.port} | Proccess: ${process.pid}`)
            });
            // app.io.attach(server); // instancio junto com Express http
        
        }

    }

}

export default Cluster;