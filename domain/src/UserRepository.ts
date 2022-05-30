import {User} from "./User";

export interface UserRepository {
    store(user: User): void;

    findUser(mathieu: string): Promise<User>;
}
