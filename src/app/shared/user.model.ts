export class User {
    Username: string;
    Password: {
        pwd: string,
        confirmPwd: string
    };
    Email: string;
    Firstname: string;
    Lastname: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
