import {UserRepositoryAdapter} from "./UserRepositoryAdapter";
import {User} from "hexagonal.domain";


describe("UserRepositoryAdapter", () => {
    test('store users', async () => {
        let userRepositoryAdapter = new UserRepositoryAdapter();

        let user = new User("mathieu");
        await userRepositoryAdapter.store(user);

        expect(await userRepositoryAdapter.findUser("mathieu")).toEqual(user)

    });
});
