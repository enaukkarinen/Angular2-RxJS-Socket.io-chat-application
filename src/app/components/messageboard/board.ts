import {Component} from 'angular2/core';
import {Row} from './row';
import {Message} from './message';
import {MessageService} from './message.service';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'app'
    selector: 'nb-board',  // <board></board>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [MessageService],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [Row
    ],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./board.html')
})
export class Board {

    error: string;
    messages: Array<Message>;
    draftMessage: Message;
    
    constructor(messageService: MessageService) {
        var messageObs = messageService.getMessages();

        messageObs.subscribe(m => {
            this.messages = m;
            var d: string = this.messages[0].datetime;
            console.log(d);
            console.log(this.messages);
        },
            error => {
                this.error = error;
                console.log(this.error);
            });
    }


    onEnter(event: any): void {
        this.sendMessage();
        event.preventDefault();
    }

    sendMessage(): void {
        let m: Message = this.draftMessage;
        m.username = "ensio";//this.currentUser;
        m.avatar = "avatar";
        //m.isRead = true;
        //this.messagesService.addMessage(m);
        this.messages.push(m);
        console.log(m);
        this.draftMessage = new Message();
    }
    ngOnInit() {
        this.draftMessage = new Message();
    }
}
