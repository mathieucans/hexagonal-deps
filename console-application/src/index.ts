import {Application} from "hexagonal.domain";
import {UserRepositoryRedisAdapter} from "hexagonal.storage";

console.log('application start');

class ConsoleApplication{
    async start() {
        let userRepositoryRedisAdapter = new UserRepositoryRedisAdapter('redis://localhost:6380');
        let application = new Application(userRepositoryRedisAdapter);

        console.log("add users")
        await application.addUser('me')
        await application.addUser('you')

        console.log("say hello");
        let hello = await application.hello();
        console.log(` > ${hello}`)
    }
}

new ConsoleApplication().start();
