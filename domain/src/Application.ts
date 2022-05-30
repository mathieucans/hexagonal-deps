import {UserRepository} from "./UserRepository";
import {User} from "./User";

export class Application {
    constructor(private userRepository:UserRepository) {
    }
    async hello() {
        let userNames = (await this.userRepository.allUsers()).map(u => u.name).join(", ");
        return `hello ${userNames}`;
    }

    async addUser(name: string) {
        await this.userRepository.store(new User(name))
    }
}
