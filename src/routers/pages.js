import expres from 'express';
import chat from './v1/chats.router.js';
import { notFoundRouter, routeErrorHandling } from '../middlewares/error.handler.js';

export default function routerVistas(app) {
    const routerApp = expres.Router();
    app.use('/', routerApp);
    
    routerApp.use('/chats', chat);

    app.use(notFoundRouter);
    app.use(routeErrorHandling);
}
