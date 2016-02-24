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
        
        this.calcTimeAgo(this.message.datetime);
        
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
    
    calcTimeAgo(messageTime :Date) {
        
        var today = new Date();
        var Christmas = messageTime;
        console.log(messageTime);
        console.log(this.message);
        var diffMs = (Christmas.valueOf() - Date.now()); // milliseconds between now & Christmas
        var diffDays = Math.round(diffMs / 86400000); // days
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas 2009 =)");
    }
}
