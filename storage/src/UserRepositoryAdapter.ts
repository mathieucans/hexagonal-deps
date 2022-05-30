import {User, UserRepository} from "hexagonal.domain";

export class UserRepositoryAdapter implements UserRepository{

    private users = new Array<User>()
    store(user: User) {
        this.users.push(user);
    }

    async findUser(mathieu: string) {
        return this.users.filter(u => u.name === mathieu).shift()!;
    }
}
