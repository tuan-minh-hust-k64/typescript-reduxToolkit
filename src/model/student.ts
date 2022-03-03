import { Schema, model } from 'mongoose';

export interface IStudent {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: 'male' | 'female';
  createdAt?: number;
  updatedAt?: number;
  city: string;
}

const schema = new Schema<IStudent>(
  {
    name: {
      type: 'string',
      required: true,
      trim: true,
    },
    age: { type: 'number', required: true },
    mark: {
      type: 'number',
      required: true,
    },
    gender: {
      type: 'string',
      required: true,
      trim: true,
    },
    city: { type: 'string', required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const studentModel = model<IStudent>('Student', schema);
export default studentModel;
