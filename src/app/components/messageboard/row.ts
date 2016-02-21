import {Component, EventEmitter} from 'angular2/core';
import {Message} from './message';

@Component({
    selector: 'nb-row',
    providers: [],
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./row.html'),
    inputs: [
    'message'
    ],
    outputs: [
        'change'
    ]
})

export class Row {
  change = new EventEmitter<any>();
  message: Message;

    constructor() {
    }
}
