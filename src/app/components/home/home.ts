import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from 'angular2/router';

import {MessageBox} from './../messaging/messagebox';
import {User} from '../authentication/user';
import {UserService} from '../authentication/user.service';

@Component({
    selector: 'home',
    providers: [UserService]
})
@View({
    directives: [CORE_DIRECTIVES, MessageBox],
    template: require('./home.html')
})
export class Home {
    jwt: string;
    decodedJwt: string;
    response: string;
    api: string;
    user: User = new User('', '');

    constructor(public router: Router, public http: Http, public authHttp: AuthHttp, public jwtHelper: JwtHelper, private userService: UserService) {
        this.jwt = localStorage.getItem('jwt');
        this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt);
        
        // react to user change
        this.userService.currentUser.subscribe(u => {
            console.log('Home reacting to user change: ' + u);
            if (u !== null) {
                this.user = u;
            }
        });
    }

    logout() {
        localStorage.removeItem('jwt');
        this.router.parent.navigateByUrl('/login');
    }

    callAnonymousApi() {
        this._callApi('Anonymous', 'http://localhost:7203/api/messages');
    }

    callSecuredApi() {
        this._callApi('Secured', 'http://localhost:7203/api/protected/messages');
    }

    _callApi(type, url) {
        this.response = null;

        if (type === 'Anonymous') {
            // For non-protected routes, just use Http
            this.http.get(url)
                .subscribe(
                response => this.response = response.text(),
                error => this.response = error.text()
                );
        }

        if (type === 'Secured') {
            // For protected routes, use AuthHttp
            this.authHttp.get(url)
                .subscribe(
                response => this.response = response.text(),
                error => this.response = error.text()
                );
        }
    }
}
