import expres from 'express';
import chat from './v1/chats.router.js'

export default function routerVistas(app) {
    const routerApp = expres.Router();
    app.use('/', routerApp);
    
    routerApp.use('/chats', chat);
}
