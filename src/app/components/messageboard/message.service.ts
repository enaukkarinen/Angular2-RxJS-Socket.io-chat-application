import { Injectable } from 'angular2/core';
import {Http} from 'angular2/http';
import {Message} from './message';


@Injectable()
export class MessageService {

    private url: string = 'http://localhost:3002/api/';

    constructor(private http: Http) { }

    getMessages() {
        // return an observable. TO-DO: how to type this.
        return this.http.get(this.url + 'messages')
            .map((responseData) => {
                return responseData.json();
            });
    }
}
