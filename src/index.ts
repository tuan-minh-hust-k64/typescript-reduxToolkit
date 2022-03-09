import { Application, NextFunction, Request, Response } from 'express';
import db from './db';
import { handleError } from './helpers/error';
import deserializeUser from './middleware/deserializeUser';
import { routerUser } from './router';
import cityRouter from './router/cityRouter';
import studentRouter from './router/studentRouter';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './model';
import { addUser, getUsersInRoom, removeUser } from './util/user';
import postRouter from './router/postRouter';
import commentRouter from './router/commentRouter';
import { addUserOnline, getUsersOnlineInPost, removeUserOnline } from './util/post';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const app: Application = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  httpServer,
  {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  }
);
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
app.use(postRouter);
app.use(commentRouter);
// app.get('/chat', (req, res) => {
//   res.send({
//     success: true,
//   });
// });


io.of('/student').on('connection', (socket) => {
  socket.on('addStudentRequest', () => {
    setTimeout(() => {
      socket.emit('addStudentResponse', true);
    }, 3000);
  });
  // socket.on('removeStudent', () =>{

  // })
});
// io.of('/login').on('connection', (socket) => {
//   socket.on('loginRequest', () => {
//     socket.emit('loginResponse', true);
//   });
// });

io.of('/chat').on('connection', (socket) => {
  socket.on('joinRequest', (user_name, room_id) => {
    //@ts-ignore
    let id = socket.id;
    let user = addUser({ id, user_name, room_id });
    socket.join(room_id);
    socket.emit('messageAuto', `you has joined this room`, room_id, user_name);
    console.log('connection');
    socket.to(room_id).emit('newJoin', `${user_name} has joined this room`);
    io.of('/chat').to(room_id).emit('roomData', user_name);
  });
  socket.on('sendMessage', (message, user_name, room_id) => {
    console.log(message, user_name, room_id)
    io.of('/chat').to(room_id).emit('newMessage', message, user_name);
  });
  socket.on('disconnect', () => {
    var user = removeUser(socket.id);
    console.log('disconnect here');
    socket.leave(user.room_id);
    socket
      .to(user.room_id)
      .emit('messageAuto', `${user.user_name} has disconnected`, user.room_id, user.user_name);
    io.of('/chat').to(user.room_id).emit('roomData', getUsersInRoom(user.room_id));
  });
});
io.of('/post').on('connection', (socket)=>{
  socket.on('joinPost', (userName) => {
    let user = addUserOnline({id:socket.id, user_name: userName}); 
    let users = getUsersOnlineInPost();
    io.of('/post').emit('resJoinedPost', users);
  })
  socket.on('sendComment', (comment, postId, userName, auth) => {
    socket.broadcast.emit('newComment', comment, postId, userName, auth);
  })
  socket.on('disconnect', () => {
    let user = removeUserOnline(socket.id);
    let users = getUsersOnlineInPost(); 
    io.of('/post').emit('resJoinedPost', users);
  })
})
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
}); 
httpServer.listen(PORT, () => {
  console.log('listening on port: ', PORT);
});
