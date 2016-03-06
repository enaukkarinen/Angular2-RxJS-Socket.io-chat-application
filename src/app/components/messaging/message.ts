
import {uuid} from '../../utils/uuid';

export class Message {
    
    id: string;
    username: string;
    datetime: string;
    avatar: string;
    message: string;
    isLoading: boolean;
    
    constructor(obj?: any) {
        this.id       = obj && obj.id       || uuid();
        this.username = obj && obj.username || null;
        this.datetime = obj && obj.datetime || new Date();
        this.avatar   = obj && obj.avatar   || 'avatar';
        this.message  = obj && obj.message  || null;
        this.isLoading  = obj && obj.isLoading  || false;
  }
}

