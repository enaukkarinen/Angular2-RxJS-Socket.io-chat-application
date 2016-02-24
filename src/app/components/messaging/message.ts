
export class Message {
    username: string;
    datetime: Date;
    avatar: string;
    message: string;

    constructor(u: string, d: Date, a: string, m: string) {
        this.username = u;
        this.datetime = d;
        this.avatar = a;
        this.message = m;
    }
}
