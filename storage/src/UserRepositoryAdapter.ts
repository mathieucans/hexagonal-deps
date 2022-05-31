import {User, UserRepository} from "hexagonal.domain";
import {createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from "redis";

export class UserRepositoryAdapter implements UserRepository {

    private client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

    constructor(url: string = 'redis://localhost:6380') {
        this.client = createClient({url: url})
    }

    private users = new Array<User>()

    async store(user: User) {
        try {
            await this.client.connect();
            await this.client.set(user.name, JSON.stringify(user))
        } finally {
            await this.client.disconnect();
        }
        this.users.push(user);
    }

    async findUser(name: string) {
        try {
            await this.client.connect();
            return JSON.parse(await this.client.get(name));
        } finally {
            await this.client.disconnect();
        }
    }

    async allUsers(): Promise<User[]> {
        const users = new Array<User>();
        try {
            await this.client.connect();
            for await (const key of this.client.scanIterator()) {
                users.push(JSON.parse(await this.client.get(key)))
            }
            return users
        } finally {
            await this.client.disconnect();
        }
    }
}
