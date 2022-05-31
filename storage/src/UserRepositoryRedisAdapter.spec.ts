import {UserRepositoryRedisAdapter} from "./UserRepositoryRedisAdapter";
import {User} from "hexagonal.domain";
import {createClient} from "redis";


describe("UserRepositoryAdapter", () => {
    let userRepositoryAdapter: UserRepositoryRedisAdapter;

    beforeEach(async () => {
        const client = createClient({
            url: 'redis://localhost:6380'
        });
        try {
            await client.connect();
            for await (const key of client.scanIterator()) {
                await client.del(key)
            }
        }finally {
            await client.disconnect();
        }
        userRepositoryAdapter = new UserRepositoryRedisAdapter('redis://localhost:6380');

    });

    test('store users', async () => {
        let user = new User("mathieu");
        await userRepositoryAdapter.store(user);

        expect(await userRepositoryAdapter.findUser("mathieu")).toEqual(user)

    });

    test('list users', async () => {
        await userRepositoryAdapter.store(new User("mathieu"));
        await userRepositoryAdapter.store(new User("thomas"));
        await userRepositoryAdapter.store(new User("loic"));

        let users = await userRepositoryAdapter.allUsers();

        expect(users).toEqual(
            [
                new User("loic"),
                new User("thomas"),
                new User("mathieu")
            ])

    });

    test.skip('connect to redis', async () => {
        const client = createClient({
            url: 'redis://localhost:6380'
        });

        client.on('error', (err) => console.error('Redis Client Error', err));

        try {
            await client.connect();

            await client.set('firstKey', 'value');
            const value = await client.get('firstKey');
            expect(value).toEqual('value');
        } finally {
            await client.disconnect()
        }

    });
});
