import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';
import routerVistas from './routers/pages.js';
import { notFoundRouter, routeErrorHandling } from './middlewares/error.handler.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

app.use(morgan("combined"));
app.use(express.json());
// app.use(cors(configCors));

routerVistas(app);

app.use(notFoundRouter);
app.use(routeErrorHandling);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
