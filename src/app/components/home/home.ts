import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router-deprecated';

import {MessageBox} from './../messaging/messagebox';
import {User} from '../../models/user';
import {UserService} from '../authentication/user.service';

@Component({
    selector: 'home',
    providers: [UserService],
    directives: [CORE_DIRECTIVES, MessageBox],
    template: require('./home.html')
})
export class Home {
    jwt: string;
    decodedJwt: any;
    response: string;
    api: string;
    user: User;

    constructor(public router: Router, public http: Http, public authHttp: AuthHttp,
    public jwtHelper: JwtHelper, private userService: UserService) {
        this.jwt = localStorage.getItem('jwt');
        this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt);
        this.user = this.userService.getCurrentUser();
    }

    logout() {
        localStorage.removeItem('jwt');
        this.router.navigateByUrl('/login');
    }

    callAnonymousApi() {
        this._callApi('Anonymous', 'http://localhost:9000/api/messages');
    }

    callSecuredApi() {
        this._callApi('Secured', 'http://localhost:9000/api/protected/messages');
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
