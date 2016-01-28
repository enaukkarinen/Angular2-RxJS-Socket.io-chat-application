
export class Message {
    message: string;
    username: string;
    datetime: string;
    imageHash: string;

    constructor(m: string, u: string, d: string, i: string) {
        this.message = m;
        this.username = u;
        this.datetime = d;
        this.imageHash = i;
    }
}
