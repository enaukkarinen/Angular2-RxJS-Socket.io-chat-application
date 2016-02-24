import {Component, EventEmitter} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Message} from './message';

@Component({
    selector: 'nb-messagerow',
    providers: [],
    directives: [NgClass],
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./messagerow.html'),
    inputs: [
    'message'
    ],
    outputs: [
        'change'
    ]
})

export class MessageRow {
    
    private static newIndex :number;
    private static lastIndex :number;
    private static latestUser :string;
    
    messageMode: number;
    change = new EventEmitter<any>();
    message: Message;
    timeAgo: string;

    constructor() {

    }
    
    ngOnInit(){
        if(isNaN(MessageRow.newIndex)) {
            MessageRow.newIndex = 0;
        }
        MessageRow.newIndex += 1;

        if(this.message.username == MessageRow.latestUser)
            this.messageMode = MessageRow.lastIndex % 2 == 1 ? 1: 0;
        else 
            this.messageMode = MessageRow.newIndex % 2 == 1 ? 1: 0;
        
        MessageRow.latestUser = this.message.username;
    }
}
