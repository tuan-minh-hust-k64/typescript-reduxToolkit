import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

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
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser>('User', schema);




export default userModel;
