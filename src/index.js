import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import routerVistas from './routers/pages.js';
import { connectDB } from './config/mongo.js';

const app = express();
dotenv.config();

connectDB();

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4000',
    },
});

app.use(morgan("combined"));
app.use(express.json());
// app.use(cors(configCors));

routerVistas(app);

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
