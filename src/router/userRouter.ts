import express, { Request, Response } from 'express';
import validateUser from '../middleware/validateUser';
import bcrypt from 'bcrypt';
import ErrorHandler from '../helpers/error';
import userModel from '../model/user';
import { deleteSessionHandler, loginHandler } from '../controllers/loginHandler';
import authMiddleware from '../middleware/authMiddleware';
export const routerUser = express.Router();
routerUser.post('/login', validateUser, loginHandler);
routerUser.post('/register', async (req: Request, res: Response) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    throw new ErrorHandler(400, 'User is already exit');
  } else {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const newUser = new userModel({
      email: req.body.email,
      password: passwordHash,
    });
    await newUser.save();
    newUser.password = '';
    res.status(200).send({
      success: true,
      user: newUser,
    });
  }
});
routerUser.delete('/logout', deleteSessionHandler);
routerUser.post('/checkLogin', authMiddleware, (req, res) => {
  res.send({
    success: true,
  })
})
