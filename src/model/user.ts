import {Schema, model} from 'mongoose';
export interface IUser {
    _id?: string;
    email: String;
    name?: String;
    password: String;
}
const schema = new Schema<IUser>({
    email: {
        type: 'string',
        trim: true,
        require: true
    },
    name: {
        type: 'string',
        trim: true,
        require: true
    },
    password: {
        type: 'string',
        trim: true,
        require: true
    }
});
const userModel = model('user', schema);

export default userModel;

export class UserDb {
    async saveUser(args: IUser): Promise<IUser> {
        const newUser = new userModel(args);
        await newUser.save();
        newUser.password='';
        return newUser;
    }
}