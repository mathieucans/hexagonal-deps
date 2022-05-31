import {UserRepositoryAdapter} from "./UserRepositoryAdapter";
import {User} from "hexagonal.domain";
import {createClient} from "redis";


describe("UserRepositoryAdapter", () => {
    test('store users', async () => {
        let userRepositoryAdapter = new UserRepositoryAdapter();

        let user = new User("mathieu");
        await userRepositoryAdapter.store(user);

        expect(await userRepositoryAdapter.findUser("mathieu")).toEqual(user)

    });

    test('list users', async () => {
        let userRepositoryAdapter = new UserRepositoryAdapter();
        await userRepositoryAdapter.store(new User("mathieu"));
        await userRepositoryAdapter.store(new User("thomas"));
        await userRepositoryAdapter.store(new User("loic"));

        let users = await userRepositoryAdapter.allUsers();

        expect(users).toEqual(
            [
                new User("mathieu"),
                new User("thomas"),
                new User("loic")])

    });

    test('connect to redis', async () => {
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
