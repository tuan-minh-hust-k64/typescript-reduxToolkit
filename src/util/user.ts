const users: any = [];
export const addUser = ({ id, user_name, room_id }:{id: string, user_name: string, room_id: string}) => {
    user_name = user_name.trim();
    room_id = room_id.trim().toLowerCase();
  
    const user = {
        id,
        user_name,
        room_id
    };
    users.push(user);
    return user;
}
export const removeUser = function(id: string){
    var index = users.findIndex((user: any) => user.id===id);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
    return {
        error: 'User already exists'
    }
}

export const getUser = function (id: string) {
    var user = users.find((user: any) => user.id===id);
    return user;
}

export const getUsersInRoom = function (room_id: string) {
    var listUsers = users.filter((user: any) => user.room_id===room_id);
    if(!listUsers) {
        return [];
    }
    return listUsers;
}

