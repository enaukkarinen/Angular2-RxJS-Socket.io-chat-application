/// <reference path="../../../custom_typings.d.ts" />
import { Injectable } from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Subject, BehaviorSubject, Observable, ConnectableObservable} from 'rxjs';
import {Message} from '../../models/message';
import {contentHeaders} from '../../utils/headers';
import {UserService} from '../authentication/user.service';
import {User} from '../../models/user';
import {Writer} from '../../models/writer';

@Injectable()
export class MessageService {

    private url: string = 'http://localhost:9000/api/';
    private socketUrl: string = 'http://localhost:9000';
    private socket: Socket;
    private userIsWriting: boolean = false;

    newMessage: Subject<Message> = new BehaviorSubject<Message>(null);
    receivedMessage: Subject<string> = new Subject<string>(null);
    writer: Subject<Writer> = new Subject<Writer>(null);

    constructor(private http: Http, private userService: UserService) {
        this.getMessages();
        var io = require('socket.io-client');
        this.socket = io(this.socketUrl);

        this.socket.on('message', (msg) => {
            this.newMessage.next(new Message(JSON.parse(msg)));
        });

        this.socket.on('message received', (msgId) => {
            this.receivedMessage.next(msgId);
        });

        this.socket.on('user typing', (writer) => {
            writer.isWriting = true;
            this.writer.next(new Writer(writer));
        });

        this.socket.on('user stopped typing', (writer) => {
            writer.isWriting = false;
            this.writer.next(new Writer(writer));
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

    startTyping(): void {
        if (this.userIsWriting === false) {
            this.userIsWriting = true;
            this.socket.emit('start typing', this.userService.getCurrentUser());
        }
    }

    stopTyping(): void {
        if (this.userIsWriting === true) {
            this.userIsWriting = false;
            this.socket.emit('stop typing', this.userService.getCurrentUser());
        }
    }

}
