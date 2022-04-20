import { IUser } from './../model/user';
import userModel, { UserDb } from "../model/user";
import { ServerError, UnauthorizedError } from '../common/error';
import { comparePassword, decodePassword, hashPassword } from '../util/crypto';
import { signCredentials } from '../util/jwt';
import { UserTokenDb } from '../model/userToken';
const userDb = new UserDb();
const userTokenDb = new UserTokenDb();

export const authService = {
    async login(args: {email: string, password: string}) {
        const {email, password} = args;
        const user = await userModel.findOne({email: email});
        if(!user) {
            throw new ServerError({data: -1})
        }
        const depass = decodePassword(password);
        //@ts-ignore
        if(! await comparePassword(user.password, depass)) throw new ServerError({data: -1})
        //@ts-ignore
        const accessToken = signCredentials({ credentials:{ userId: user._id, userName: user.name}});
        //@ts-ignore
        const refreshToken = signCredentials({ credentials:{ userId: user._id, userName: user.name}, type: 'refreshToken'});
        //@ts-ignore
        await userTokenDb.updateUserToken({type: 'LOGIN', accessToken, refreshToken, userId: user._id});
        return {
            userId: user._id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            userName: user.name
        }
    },

    async logout(args: {userId: string}) {
        const {userId} = args;
         await userTokenDb.updateUserToken({type: 'LOGOUT',userId});
         return {userId}
    },

    async register(args: IUser) {
        const userExit = await userModel.findOne({email: args.email});
        if(userExit){
            throw new ServerError({data: -2})
        }
        //@ts-ignore
        let depass = decodePassword(args.password);
        args.password = await hashPassword(depass);

        const newUser = await userDb.saveUser(args);
        return {
            userId: newUser._id,
            email: newUser.email,
        }
    },
    async getAccessToken(userId: string) {
        const userToken = await userTokenDb.getUserTokenById(userId);
        if(!userToken) {
            throw new UnauthorizedError({message: 'Invalid token'});
        }
        return userToken.accessToken;
    },
    async getRefreshToken(userId: string) {
        const userToken = await userTokenDb.getUserTokenById(userId);
        if(!userToken) {
            throw new UnauthorizedError({message: 'Invalid token'});
        }
        return userToken.refreshToken;
    }
}