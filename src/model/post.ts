import { Schema, model } from 'mongoose';
export interface IPost {
  title: string;
  body: string;
  commentCount: number;
  auth: string;
}

const schema = new Schema<IPost>({
  title: {
    type: 'string',
    required: true,
    trim: true,
  },
  body: {
    type: 'string',
    required: true, 
    trim: true,
  },
  commentCount: {
    type: 'number',
    required: true,
    default: 0,
  },
  auth: {
    type: 'string',
    required: true,
    trim: true,
  }
});
const postModel = model<IPost>('Post', schema);
export default postModel;
