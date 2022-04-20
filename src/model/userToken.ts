import {Schema, model} from 'mongoose';
export interface IUserToken {
    _id?: String;
    userId: String;
    token: String;
    refreshToken: String;
}
const schema = new Schema<IUserToken>({
    userId: {
        type: 'string',
        require: true,
        trim: true,
    },
    token: { type: 'string', trim: true },
    refreshToken: { type: 'string', trim: true}
}, 
);
const userTokenModel = model('userToken', schema);

export class UserTokenDb {
    async updateUserToken(args: {type: 'LOGOUT' | 'UPDATE' | 'LOGIN', refreshToken?: string, accessToken?: string, userId: string}) {
        const {type, refreshToken, accessToken, userId} = args;
        if(type === 'UPDATE') {
            await userTokenModel.findOneAndUpdate({userId: userId}, {$set: {accessToken: accessToken, refreshToken: refreshToken}});
        }
        if(type=='LOGOUT') {
            await userTokenModel.findOneAndUpdate({userId: userId}, {$set: {accessToken: null, refreshToken: null}});
        }
        if(type=='LOGIN') {
            await userTokenModel.create({userId: userId, accessToken: accessToken, refreshToken: refreshToken});
        }
    }
    async getUserTokenById(userId:string): Promise<IUserToken | any> {
        return userTokenModel.findOne({userId:userId});
    }
}
