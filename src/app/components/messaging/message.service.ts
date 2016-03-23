/// <reference path="../../../custom_typings.d.ts" />
import { Injectable } from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Subject, BehaviorSubject, Observable, ConnectableObservable} from 'rxjs';
import {Message} from '../../models/message';
import {contentHeaders} from '../../utils/headers';
import {UserService} from '../authentication/user.service';
import {User} from '../../models/user';
import {Writer} from '../../models/writer';
import {MessagingEvent} from './messagingevent';

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
        var jwt = localStorage.getItem('jwt');
        this.socket = io.connect(this.socketUrl, {query: 'token=' + jwt});

        this.socket.on('connect', () => {
           //console.log('connected'); 
        });
        
        this.socket.on('disconnect', () => {
           //console.log('disconnected'); 
        });
        
        this.socket.on(MessagingEvent[MessagingEvent.NewMessage], (msg) => {
            this.newMessage.next(new Message(JSON.parse(msg)));
        });

        this.socket.on(MessagingEvent[MessagingEvent.MessageReceived], (msgId) => {
            this.receivedMessage.next(msgId);
        });

        this.socket.on(MessagingEvent[MessagingEvent.UserTyping], (writer) => {
            writer.isWriting = true;
            this.writer.next(new Writer(writer));
        });

        this.socket.on(MessagingEvent[MessagingEvent.UserStoppedTyping], (writer) => {
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
        this.socket.emit(MessagingEvent[MessagingEvent.SendMessage], msg);
    }

    startTyping(): void {
        if (this.userIsWriting === false) {
            this.userIsWriting = true;
            this.socket.emit(MessagingEvent[MessagingEvent.ImTyping], this.userService.getCurrentUser());
        }
    }

    stopTyping(): void {
        if (this.userIsWriting === true) {
            this.userIsWriting = false;
            this.socket.emit(MessagingEvent[MessagingEvent.IStoppedTyping], this.userService.getCurrentUser());
        }
    }

}
