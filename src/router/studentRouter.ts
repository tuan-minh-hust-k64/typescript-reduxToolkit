import express from 'express';
import ErrorHandler from '../helpers/error';
import authMiddleware from '../middleware/authMiddleware';
import studentModel from '../model/student';

const studentRouter = express.Router();

studentRouter.get('/student', authMiddleware, async (req, res) => {
  let { page, size, sortBy, ...args } = req.query;
  if (!page) {
    page = '1';
  }
  if (!size) {
    size = '10';
  }
  const sort = {};
  if (sortBy) {
    const parts = sortBy.toString().split(':');
    //@ts-ignore
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  const limit = parseInt(size.toString(), 10);
  const skip = (parseInt(page.toString(), 10) - 1) * limit;
  try {
    //@ts-ignore
    const students = await studentModel.find().where(args).limit(limit).skip(skip).sort(sort);
    res.status(200).send(students);
  } catch (err) { 
    throw new ErrorHandler(500, 'Can not found student');
  }
});
studentRouter.post('/student', authMiddleware, async (req, res) => {
  try {
    const newStudent = await studentModel.create(req.body);
    res.send(newStudent);
  } catch (err) {
    throw new ErrorHandler(500, 'Service error');
  }
});
studentRouter.delete('/student/:id', authMiddleware, async (req, res) => {
  try {
    await studentModel.findByIdAndDelete({ _id: req.params.id });
    res.send({
      success: true,
    });
  } catch (err) {
    throw new ErrorHandler(500, 'Service error');
  }
});

export default studentRouter;
