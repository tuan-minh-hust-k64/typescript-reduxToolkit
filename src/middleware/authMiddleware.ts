import { UnauthorizedError } from "../common/error";
import asyncHandle from "../helpers/asyncHandle";
import { authService } from "../service/auth.service";
import { verifyCredentials } from "../util/jwt";

export const verifyTokenMiddleware = asyncHandle(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;
    if(authHeader) {
        const [type, _token] = authHeader.split(' ');
        if(type.toLocaleLowerCase() !=='bearer' || !_token) {
            throw new UnauthorizedError({message: 'Invalid token'});
        }
        token = _token;
    }else {
        const _token = req.cookies['x-access-token'];
        if(!_token) {
            throw new UnauthorizedError({message: 'Invalid token'});
        }
        token = _token;
    }
    const credentials = verifyCredentials({token});
    if(!credentials) {
        throw new UnauthorizedError({message: 'Invalid token'});
    }
    //@ts-ignore
    const saveToken = await authService.getAccessToken(credentials.userId);
    if(!saveToken || saveToken !== token) {
        throw new UnauthorizedError({message: 'Invalid token'});    
    }
    req.credentials = credentials;
    return next!();
})


export const verifyRefreshTokenMiddleware = asyncHandle(async (req, res, next) => {
    let token = req.body.refresh_token;
    if (!token) {
      const _token = req.cookies['x-refresh-token'];
      if (!_token) throw new UnauthorizedError({ message: 'Invalid Token' });
      token = _token;
    }
  
    const credentials = verifyCredentials({ token, type: 'refreshToken' });
    if (!credentials) throw new UnauthorizedError({ message: 'Invalid Token' });
  
    // TODO: REDIS
    //@ts-ignore
    const savedToken = await authService.getRefreshToken(credentials.userId);
    if (!savedToken || savedToken !== token) throw new UnauthorizedError({ message: 'Invalid Token' });
    req.credentials = credentials;
    return next!();
})