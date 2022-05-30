export class User {
    constructor(public readonly name:string) {
    }
}
export class UserRepositoryAdapter {

    private users = new Array<User>()
    store(user: User) {
        this.users.push(user);
    }

    async findUser(mathieu: string) {
        return this.users.filter(u => u.name === mathieu).shift()!;
    }
}
