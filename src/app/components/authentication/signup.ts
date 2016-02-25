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

        // react to user change
        this.userService.currentUser.subscribe(u => {
            if (u !== null) {
                console.log('reacting to user change: ' + u);
                this.router.parent.navigateByUrl('/home');
            }
        });

    }

    signup(event: any, username: string, password: string): void {
        event.preventDefault();
        this.userService.signup(username, password);
    }

    login(event) {
        event.preventDefault();
        this.router.parent.navigateByUrl('/login');
    }

    /*
    signup(event, username, password) {
        event.preventDefault();
        let body = JSON.stringify({ username, password });
        this.http.post('http://localhost:7203/users', body, { headers: contentHeaders })
            .subscribe(
            response => {
                console.log(response.json());
                localStorage.setItem('jwt', response.json().id_token);
                this.router.parent.navigateByUrl('/home');
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }
    */
}
