export class User {
    Username: string;
    Password: string;
    Email: string;
    Firstname: string;
    Lastname: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
