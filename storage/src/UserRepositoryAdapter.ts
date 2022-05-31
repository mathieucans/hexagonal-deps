import {User, UserRepository} from "hexagonal.domain";
import {createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from "redis";

export class UserRepositoryAdapter implements UserRepository{
    
    private client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

    constructor() {
        this.client = createClient()
    }
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
