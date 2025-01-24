import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import routerVistas from './routers/pages.js';
import socketIO from './routers/io.js';

const app = express();
dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const corsOptions = {
    origin: '*', // Puedes especificar la IP o dominio que debe tener acceso
    methods: ['GET', 'POST']
};
// permite que el servidor de WebSockets acepte conexiones desde el origen http://localhost:4000
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
});
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
// app.use(cors(configCors));

routerVistas(app);
socketIO(io);

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
