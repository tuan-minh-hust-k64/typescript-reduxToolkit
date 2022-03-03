import { Schema, model } from 'mongoose';

export interface ICity {
  code: string;
  name: string;
}

const schema = new Schema<ICity>({
  code: {
    type: 'string',
    required: true,
    trim: true,
  },
  name: {
    type: 'string',
    required: true,
    trim: true,
  },
});
const cityModel = model<ICity>('City', schema);
export default cityModel;
