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

    private static newIndex: number;
    private static lastIndex: number;
    private static latestUser: string;

    messageMode: number;
    change = new EventEmitter<any>();
    message: Message;
    timeAgo: string;
    isLoading: boolean;
    
    constructor() {
        this.isLoading = true;
        
        setTimeout(() => {
        this.isLoading = false;
        }, 1000);
    }

    ngOnInit() {
        this.timeAgo = this.calcTimeAgo(this.message.datetime);

        if (isNaN(MessageRow.newIndex)) {
            MessageRow.newIndex = 0;
        }
        MessageRow.newIndex += 1;

        if (this.message.username === MessageRow.latestUser) {
            this.messageMode = MessageRow.lastIndex % 2 === 1 ? 1 : 0;
        } else {
            this.messageMode = MessageRow.newIndex % 2 === 1 ? 1 : 0;
        }
        MessageRow.latestUser = this.message.username;
    }

    calcTimeAgo (messageTime: string): string {

        var today = new Date();
        /*
        console.log("messagetime: " + messageTime);
        console.log("messageTime in local:" + new Date(messageTime.toString() ));
        console.log("today: " + today.toISOString());
        */
        var diffMs = Math.abs(new Date(messageTime.toString()).getTime()
         - today.getTime()); // milliseconds between now & Christmas
        //console.log('diffMs: ' + diffMs);

        var diffDays = Math.round(diffMs / 86400000); // days
        if (diffDays >= 7) {
            var weekCount = Math.floor(diffDays / 7);
            if (weekCount >= 4) {
                var monthCount = Math.floor(weekCount / 4);
                if (monthCount === 1) {
                    return '1 month ago';
                } else {
                    return monthCount + ' months ago';
                }
            } else if (weekCount < 4 && weekCount > 1) {
                return weekCount + ' weeks ago';
            } else {
                return '1 week ago';
            }
        } else if (diffDays < 7 && diffDays > 1) {
            return diffDays + ' days ago';
        } else if (diffDays === 1) {
            return '1 day ago';
        } else {
            var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
            //console.log('diffHrs: ' + diffHrs);

            if (diffHrs > 1) {
                return diffHrs + 'hours ago';
            } else if (diffHrs === 1) {
                return '1 hour ago';
            } else {
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                //console.log('diffMins: ' + diffMins);

                if (diffMins > 1) {
                    return diffMins + ' minutes ago';
                } else if (diffMins === 1) {
                    return '1 minute ago';
                } else {
                    var diffSeconds = Math.round(diffMs / 1000);

                    if (diffMins >= 3) {
                        return diffSeconds + ' seconds ago';
                    } else {
                        return 'a moment ago';
                    }
                }
            }
        }
        //console.log('diffDays: ' + diffDays);
        //var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        //console.log('diffHrs: ' + diffHrs);
        //var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        //console.log('diffMins: ' + diffMins);
        //var dffSeconds = Math.round(diffMs / 1000);
        //console.log('dffSeconds: ' + dffSeconds);
        //console.log(diffDays + ' days, ' + diffHrs + ' hours, ' + diffMins + ' minutes from now');
    }
}
