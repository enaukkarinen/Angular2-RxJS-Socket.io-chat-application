
export class User {
    id: string;
    username: string;
    avatar: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.username = obj && obj.username || null;
        this.avatar = obj && obj.avatar || 'avatar';
    }
}
