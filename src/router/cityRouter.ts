import express from 'express';
import ErrorHandler from '../helpers/error';
import cityModel from '../model/city';
const cityRouter = express.Router();

cityRouter.get('/all-city', async (req, res) => {
    try{

        const citys = await cityModel.find();
        res.status(200).send(citys);
    }catch(err){
        throw new ErrorHandler(500, 'Server error')
    }
})
export default cityRouter;