import {AfterViewChecked, Component, ElementRef, ViewChild} from 'angular2/core';
import {MessageRow} from './messagerow';
import {Message} from './message';
import {MessageService} from './message.service';
import {UserService} from '../authentication/user.service';
import {Observable} from 'rxjs';


@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'app'
    selector: 'nb-messagebox',  // <board></board>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [MessageService],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [MessageRow],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./messagebox.html')
})
export class MessageBox implements AfterViewChecked {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    messages: Array<any> = [];
    draftMessage: Message;
    messages2: Observable<any>;

    constructor(private messageService: MessageService, private userService: UserService) {

        this.messageService.getMessages().subscribe(m => { 
            this.messages = m; }, 
            error => { console.log(error); 
        });

        this.messageService.newMessage.subscribe( m => {
            if(m != null) {
                this.messages.push(m);
            }
        },
        (e) => console.log(e));
    }

    onEnter(event: any): void {
        this.sendMessage();
        event.preventDefault();
    }

    sendMessage(): void {
        let m: Message = this.draftMessage;
        m.username = 'ensio'; //this.currentUser;
        m.avatar = 'avatar';
        m.datetime = new Date().toISOString();

        this.messageService.sendMessage(m);

        this.draftMessage = new Message(
            {
                username: 'ensio',
                datetime: new Date().toISOString()     
            });
    }

    ngOnInit() {
        this.draftMessage = new Message(
            {
                username: 'ensio',
                datetime: new Date().toISOString()     
            });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
            console.log(err);
        };
    }

}
