import {View, Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';

import {LoggedInRouterOutlet} from './logged_in_outlet';
import { MessageBox } from './components/messaging/messagebox';
import {Home} from './components/home/home';
import {Login} from './components/authentication/login';
import {Signup} from './components/authentication/signup';
let template = require('./app.html');

@Component({
    selector: 'noob-app'
})
@View({
    template: template,
    directives: [LoggedInRouterOutlet]
})
@RouteConfig([
    { path: '/', redirectTo: ['/Home'] },
    { path: '/home', component: Home, as: 'Home' },
    { path: '/login', component: Login, as: 'Login' },
    { path: '/signup', component: Signup, as: 'Signup' }
])

export class App {
    constructor(public router: Router) {
    }
}

