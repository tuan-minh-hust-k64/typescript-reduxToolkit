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
      notifications: [],
    });
    await newUser.save();
    newUser.password = '';
    res.status(200).send({
      success: true,
      user: newUser,
    });
  }
});
routerUser.patch('/user', authMiddleware, async (req, res) => {
  //@ts-ignore
  const user = req.user;
  user.notifications = user.notifications.filter((item: any) => {
    if(item.new){
      item.new=false;
      return item;
    }else{
      return item;
    }
  })
  await user.save();
  res.status(200).send(user);

})
routerUser.delete('/logout', deleteSessionHandler);
routerUser.post('/checkLogin', authMiddleware,async (req, res) => {
  //@ts-ignore
  const user = await userModel.findOne({ email: req.email });
  
  res.send({
    success: true,
    //@ts-ignore
    email: req.email,
    notifications: user?.notifications || [],
  })
})
