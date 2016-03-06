/// <reference path="../../../custom_typings.d.ts" />
import { Injectable } from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Subject, BehaviorSubject, Observable, ConnectableObservable} from 'rxjs';
import {Message} from './message';
import {contentHeaders} from '../../utils/headers';

@Injectable()
export class MessageService {

    private url: string = 'http://localhost:9000/api/';
    private socketUrl: string = 'http://localhost:9000';
    private socket: Socket;
    newMessage: Subject<Message> = new BehaviorSubject<Message>(null);

    currentThreadMessages: ConnectableObservable<any>;
    
    constructor(private http: Http) { 
        this.getMessages();
        var io = require('socket.io-client');
        this.socket = io(this.socketUrl);

        this.socket.on('message', (msg) => {  
            console.log('socket on new message');
            let m = new Message(JSON.parse(msg));
            this.newMessage.next(m); 
        });
    }

    getMessages(): Observable<any> {
        return this.http.get(this.url + 'messages')
        .map((responseData) => { return responseData.json(); });
    }

    sendMessage(message: Message): void {
        
        let msg = JSON.stringify(message);
        this.socket.emit('new message', msg);

    }

}
