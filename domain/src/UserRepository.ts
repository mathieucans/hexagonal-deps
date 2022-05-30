import {User} from "./User";

export interface UserRepository {
    store(user: User): Promise<void>;

    findUser(name: string): Promise<User>;

    allUsers() : Promise<Array<User>>
}
