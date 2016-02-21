import {Component} from 'angular2/core';
@Component({
    selector: 'nb-message',
    providers: [],
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./message.html')
})

export class Message {
  @Output()
  change = new EventEmitter<any>();
  @Input()
  label: string;

    constructor() {
    }
}
