import { Application, NextFunction, Request, Response } from 'express';
import db from './db';
import { handleError } from './helpers/error';
import deserializeUser from './middleware/deserializeUser';
import { routerUser } from './router';
import cityRouter from './router/cityRouter';
import studentRouter from './router/studentRouter';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const app: Application = express();
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

app.listen(PORT, () => {
  console.log('listening on port: ', PORT);
});
