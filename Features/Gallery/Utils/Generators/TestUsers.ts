//region Users
import uuid from "react-native-uuid";
export class User {
    constructor(avatarPath: string | undefined, name: string = 'Test User') {
        if (!avatarPath) {
            avatarPath = './assets/images/avatars/Empty.png'
        }
        this.avatarPath = avatarPath;
        this.name = name;
    }

    guid: string = uuid.v4().toString();
    avatarPath: string;
    name: string;
}

const users: User[] = [];
const ostap = new User('./assets/images/avatars/Ostap.png', 'Yoba ASTAP');
const ann = new User('./assets/images/avatars/Ann.png', 'Crazy Ann');
const leva = new User('./assets/images/avatars/Leva.png', 'Poor Leva');
const me = new User('./assets/images/avatars/Me.png', 'Just ME');
const nyasha = new User('./assets/images/avatars/Nastya.png', 'Nyasha Nya');
users.push(...[ostap, ann, leva, me, nyasha]);

export function GetTestUsers(): User[] {
    return users;
}

export function GetAuthor(): User {
    return users.find(u => u.name == 'Just ME')
        ?? new User('./assets/images/avatars/Me.png', 'Just ME');
}

//endregion