import {UserRepository} from "./UserRepository";
import {User} from "./User";

export class UserRepositoryInMemory implements UserRepository {
    private users = new Array<User>()

    async store(user: User) {
        this.users.push(user);
    }

    async findUser(name: string) {
        return this.users.filter(u => u.name === name).shift()!;
    }
    async allUsers(): Promise<User[]> {
        return this.users
    }

}
