import {User} from './user';

export class Writer extends User {

    isWriting: boolean;
    
    constructor(obj?: any) {
        super(obj);
        this.isWriting = obj && obj.isWriting || false;
    }
}
