import {UserRepositoryAdapter} from "./UserRepositoryAdapter";
import {User} from "hexagonal.domain";


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
});
