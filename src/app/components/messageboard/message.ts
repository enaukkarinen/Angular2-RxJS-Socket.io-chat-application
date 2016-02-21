

export class Message {
    username: string;
    datetime: string;
    avatar: string;
    message: string;
 
    constructor(){}   
    constructor(u :string, d :string, a :string, m :string) {
        this.username = u;
        this.datetime = d; 
        this.avatar = a;
        this.message = m;
    }
}