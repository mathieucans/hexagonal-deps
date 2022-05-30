import {Application} from "./Application";
import {UserRepositoryInMemory} from "./UserRepositoryInMemory";

describe('Application', () => {
    test('say hello to all user', async () => {
        let application = new Application(new UserRepositoryInMemory());
        await application.addUser("xavier");
        await application.addUser("mathieu");
        await application.addUser("thomas");

        expect(await application.hello()).toEqual("hello xavier, mathieu, thomas");
    });
});

