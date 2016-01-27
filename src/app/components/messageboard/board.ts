import {Component} from 'angular2/core';
import {Message} from './message';
import {MessageService} from './message.service';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'app'
    selector: 'board',  // <board></board>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [MessageService],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
    ],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./board.html')
})
export class Board {

    messages: Array<Message>;

    constructor(messageService: MessageService) {
        this.messages = messageService.getMessages();
    }

    ngOnInit() {
        console.log('hello board component');
    }

}
