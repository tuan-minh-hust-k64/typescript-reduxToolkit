export interface ServerToClientEvents {
  removeStudentResponse: (success: boolean) => void;
  loginResponse: (success: boolean) => void;
  addStudentResponse: (success: boolean) => void;
  messageAuto:(message: string, roomId: string, userName: string) => void;
  newJoin:(message: string) => void;
  roomData: (userName: string) => void;
  newMessage: (message: string, userName: string) => void;
  resJoinedPost:(online: string[]) => void;
  newComment:(comment: string, postId: string, userName: string, auth: string) => void;
}
 
export interface ClientToServerEvents {
  addStudentRequest: () => void;
  removeStudent: () => void;
  loginRequest: () => void;
  joinRequest: (userName: string, roomId: string) => void;
  sendMessage: (message: string, userName: string, roomId: string) => void;
  outRoom:() => void;
  joinPost:(userName: string) => void;
  sendComment:(comment: string, postId: string, userName: string, auth: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
