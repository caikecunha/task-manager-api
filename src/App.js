import express from 'express';
import userRoutes from './modules/user/userRoutes.js';
import tokenRoutes from './modules/token/tokenRoutes.js';
import taskRoutes from './modules/task/taskRoutes.js';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes()
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/user', userRoutes);
        this.app.use('/login', tokenRoutes);
        this.app.use('/task', taskRoutes);
    }
}

export default new App().app;
