export class Reading {
    Id: number;
    Title: string;
    Author: string;
    Link: string;
    Rating: number;
    Summary: string;
    DateRead: Date;
    Category: number;
    Favorite: number;
    UserId: number;
    Deleted: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
