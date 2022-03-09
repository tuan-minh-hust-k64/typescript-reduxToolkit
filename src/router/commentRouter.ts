import express from 'express';
import ErrorHandler from '../helpers/error';
import authMiddleware from '../middleware/authMiddleware';
import commentModel from '../model/comment';
import userModel from '../model/user';
const commentRouter = express.Router();
commentRouter.get('/comment/:id', authMiddleware, async (req, res) => {
    const comments = await commentModel.find({post: req.params.id});
    res.status(200).send(comments);
});
commentRouter.post('/comment', authMiddleware, async (req, res, next) => {
    const comment = req.body.comment;
    try{
        const newcomment = await commentModel.create(comment);
        const user = await userModel.findOne({email: req.body.auth});
        //@ts-ignore
        if(user.email !== newcomment.user){
            //@ts-ignore
            user?.notifications = [{content: `${newcomment.user} đã bình luận 1 bài viết của bạn`, new: true, postId: newcomment.post }, ...user.notifications];
            //@ts-ignore
            user.save();
        }
        res.status(200).send(newcomment);
    }catch (err) {
        next(new ErrorHandler(401, 'Please authenticate'))
    }
});
commentRouter.delete('/comment/:id', authMiddleware, async (req, res) =>{
    const comment = await commentModel.findOneAndDelete({_id: req.params.id});
    res.status(200).send(comment);
})
export default commentRouter;