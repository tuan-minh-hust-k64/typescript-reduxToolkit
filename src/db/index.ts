import mongoose from "mongoose"
import cityModel from "../model/city";
import studentModel from "../model/student";
import userModel from "../model/user";

const db = async() =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/manager_school');
        console.log('Connect success');
    }catch(e){
        console.log('Connect failure');
    }

}

export const sessions: Record<
  string,
  { sessionId: string; email: string; valid: boolean }
> = {};

export function getSession(sessionId: string) {
  const session = sessions[sessionId];

  return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string) {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }

  return sessions[sessionId];
}

export function createSession(email: string) {
  const sessionId = String(Object.keys(sessions).length + 1);

  const session = { sessionId, email, valid: true };

  sessions[sessionId] = session;

  return session;
}

// export function getUser(email: string) {
//   return users.find((user) => user.email === email);
// }


export default db;