import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from './headers';


@Component({
    selector: 'login'
})
@View({
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: `
    <div class="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form" (submit)="login($event, username.value, password.value)">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" #username class="form-control" id="username" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" #password class="form-control" id="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
                <a [routerLink]="['Signup']">Click here to Signup</a>
        </form>
    </div>
    `,
    styles: [`
        .login {
        width: 40%;
        }
  `]
})
export class Login {
    constructor(public router: Router, public http: Http) {
    }

    login(event, username, password) {
        event.preventDefault();
        let body = JSON.stringify({ username, password });
        this.http.post('http://localhost:7203/sessions/create', body, { headers: contentHeaders })
            .subscribe(
            response => {
                localStorage.setItem('jwt', response.json().id_token);
                this.router.parent.navigateByUrl('/home');
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }

    signup(event) {
        event.preventDefault();
        this.router.parent.navigateByUrl('/signup');
    }
}
