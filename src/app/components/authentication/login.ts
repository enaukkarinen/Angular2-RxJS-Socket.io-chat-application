import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';

import {UserService} from './user.service';

@Component({
    selector: 'login',
    providers: [UserService],
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: require('./login.html')
})
export class Login {

    constructor(private router: Router, private userService: UserService) {

    }

    login(event, username, password) {
        event.preventDefault();
        this.userService.login(username, password).then(() => {
            this.router.navigateByUrl('/home');
        },
        () => {
            
        });
    }

    signup(event) {
        event.preventDefault();
        this.router.navigateByUrl('/signup');
    }
}
