import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import commentModel from '../model/comment';
import postModel from '../model/post';
const postRouter = express.Router();
postRouter.get('/post', authMiddleware, async (req, res) => {
    const posts = await postModel.find();
    res.status(200).send(posts);
});
postRouter.post('/post', authMiddleware, async (req, res) => {
    const post = req.body;
    const newPost = await postModel.create(post);
    res.status(200).send(newPost);
});
postRouter.delete('/post/:id', authMiddleware, async (req, res) => {
    const post = await postModel.findOneAndDelete({ _id: req.params.id});
    //@ts-ignore
    await commentModel.deleteMany({post: post._id});
    res.status(200).send(post);
})
export default postRouter;