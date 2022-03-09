import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  notifications: string[];
}

const notification = new Schema({
  content: {
    type: 'string',
    required: true,
    trim: true,
  },
  new: {
    type: 'boolean',
    required: true,
    trim: true,
  },
  postId: {
    type: 'string',
    required: true,
    trim: true,
  }
},{
  timestamps: true
})

const schema = new Schema<IUser>(
  {
    email: {
      type: 'string',
      required: true,
      trim: true,
    },
    password: {
      type: 'string',
      required: true,
      trim: true,
    },
    notifications: [notification]
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser>('User', schema);




export default userModel;
