import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import {UserService} from './user.service';


@Component({
    selector: 'signup',
    providers: [UserService],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: require('./signup.html')
})
export class Signup {

    constructor(public router: Router, private userService: UserService) {

    }

    signup(event: any, username: string, password: string, avatar: string): void {
        event.preventDefault();
        this.userService.signup(username, password, avatar).then(() => {
            console.log('then');
            this.router.navigateByUrl('/home');
        });
    }

    login(event) {
        event.preventDefault();
        this.router.navigateByUrl('/login');
    }
}
