import { Application, NextFunction, Request, Response } from 'express';
import db from './db';
import { handleError } from './helpers/error';
import deserializeUser from './middleware/deserializeUser';
import { routerUser } from './router';
import cityRouter from './router/cityRouter';
import studentRouter from './router/studentRouter';
import { createServer } from "http";
import { Server } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './model';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const app: Application = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  }
});
const PORT = 8080;

db();
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(routerUser);
app.use(cityRouter);
app.use(studentRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});


io.on("connection", (socket) => {
  socket.on('addStudents', () =>{
    setTimeout(() =>{
      socket.emit('addStudent', true);
    }, 3000);
  });
  // socket.on('removeStudent', () =>{

  // })
});

httpServer.listen(PORT, () => {
  console.log('listening on port: ', PORT);
});
