import { Schema, model } from 'mongoose';

export interface IComment {
  content: string;
  user: string;
  post: string;
}
const schema = new Schema<IComment>({
  content: {
    type: 'string',
    required: true,
    trim: true,
  },
  user: {
    type: 'string',
    required: true,
    trim: true,
  },
  post: { 
    type: 'string',
    required: true,
    trim: true,
  },
});
const commentModel = model<IComment>('Comment', schema);
export default commentModel;
