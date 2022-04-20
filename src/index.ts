import { handleApiError, handleNotFoundErr } from './helpers/errorHandler';
import { Application, NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
require('dotenv').config()
import db from './db';
import router from './router';
// import dotenv from './util/dotenv';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const app: Application = express();
const httpServer = createServer(app);
// dotenv.config();
const PORT = 8080;

db();
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(router)

app.use(handleApiError);
app.use(handleNotFoundErr);
httpServer.listen(PORT, () => {
  console.log('listening on port: ', PORT);
});
