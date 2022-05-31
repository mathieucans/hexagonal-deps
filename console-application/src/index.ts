import {Application} from "hexagonal.domain";
import {UserRepositoryAdapter} from "hexagonal.storage";

console.log('application start');

class ConsoleApplication{
    async start() {
        let application = new Application(new UserRepositoryAdapter());

        console.log("add users")
        await application.addUser('me')
        await application.addUser('you')

        console.log("say hello");
        let hello = await application.hello();
        console.log(` > ${hello}`)
    }
}

new ConsoleApplication().start();
