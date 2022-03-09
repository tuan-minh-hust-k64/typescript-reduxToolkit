const usersOnline: any = [];
export const addUserOnline = ({id, user_name}:{id: string, user_name: string}) => {
    user_name = user_name.trim();
  
    const user = {
        id,
        user_name,
    };
    usersOnline.push(user);
    return user;
}
export const removeUserOnline = function(id: string){
    var index = usersOnline.findIndex((user: any) => user.id===id);
    if(index !== -1){
        return usersOnline.splice(index, 1)[0];
    }
    return {
        error: 'User already exists'
    }
}

export const getUserOnline = function (id: string) {
    var user = usersOnline.find((user: any) => user.id===id);
    return user;
}

export const getUsersOnlineInPost = function () {
    return usersOnline;
}

