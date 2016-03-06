import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import {UserService} from './user.service';


@Component({
    selector: 'signup',
    providers: [UserService],
})
@View({
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: require('./signup.html')
})
export class Signup {

    constructor(public router: Router, private userService: UserService) {

    }

    signup(event: any, username: string, password: string, avatar: string): void {
        event.preventDefault();
        this.userService.signup(username, password, avatar).then(() => {
            console.log('then');
            this.router.parent.navigateByUrl('/home');
        });
    }

    login(event) {
        event.preventDefault();
        this.router.parent.navigateByUrl('/login');
    }
}
