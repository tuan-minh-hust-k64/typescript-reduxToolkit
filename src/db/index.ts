import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/manager_school');
    console.log('Connect success');
  } catch (e) {
    console.log('Connect failure');
  }
  
};



export default db;
