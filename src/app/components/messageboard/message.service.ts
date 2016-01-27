
import { Injectable } from 'angular2/core';
import {Http} from 'angular2/http';
import {Message} from './message';


@Injectable()
export class MessageService {

    private 
    messages: Array<Message>;

    constructor() {
        this.messages = new Array<Message>(
            {
                message: 'Wow! This application is shitty.',
                username: 'Joe Eames',
                datetime: new Date().toLocaleString(),
                imageHash: 'webpackAndangular2.png'
            },
            {
                message: 'What is this?',
                username: 'Charles Max Wood',
                datetime: new Date().toLocaleString(),
                imageHash: 'webpackAndangular2.png'
            },
            {
                message: 'asdfsdgadfas',
                username: 'Gregg Pollack',
                datetime: new Date().toLocaleString(),
                imageHash: 'webpackAndangular2.png'
            },
            {
                message: 'What is MessageBox?',
                username: 'John Papa',
                datetime: new Date().toLocaleString(),
                imageHash: 'webpackAndangular2.png'
            },
            {
                message: 'Who uses webpack nowadays?..',
                username: 'Dan Wahlin',
                datetime: new Date().toLocaleString(),
                imageHash: 'webpackAndangular2.png'
            }
        );
    }

    getMessages() {
        return this.messages;
    }
}
