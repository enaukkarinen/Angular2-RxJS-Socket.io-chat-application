import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';

import {UserService} from './user.service';

@Component({
    selector: 'login',
    providers: [UserService],
})
@View({
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: require('./login.html')
})
export class Login {

    constructor(private router: Router, private userService: UserService) {

    }

    login(event, username, password) {
        event.preventDefault();
        this.userService.login(username, password).then(() => {
            this.router.parent.navigateByUrl('/home');
        },
        () => {
            
        });
    }

    signup(event) {
        event.preventDefault();
        this.router.parent.navigateByUrl('/signup');
    }
}
