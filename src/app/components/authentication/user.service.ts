import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Subject, ReplaySubject, BehaviorSubject} from 'rxjs';

import { contentHeaders } from '../../utils/headers';
import {User} from './user';


@Injectable()
export class UserService {

    private port = 9000;
    private signupUrl = 'http://localhost:' + this.port + '/users';
    private loginUrl = 'http://localhost:' + this.port + '/sessions/create';

    //public currentUser = new ReplaySubject<User>(2);
    //public userError = new ReplaySubject<string>(null);
    //    
    public currentUser: Subject<User> = new BehaviorSubject<User>(null);
    public userError: Subject<string> = new BehaviorSubject<string>(null);

    constructor(private http: Http) {}

    signup(username: string, password: string): void {
        this.post(this.signupUrl, username, password);
    }

    login(username: string, password: string): void {
        this.post(this.loginUrl, username, password);
    }

    private post(url: string, username: string, password: string): void {

        let body = JSON.stringify({ username, password });
        this.http.post(url, body, { headers: contentHeaders }).subscribe(
            response => {
                let user = response.json();
                localStorage.setItem('jwt', user.id_token);
                this.currentUser.next(new User(user.username, user.avatar));
            },
            error => {
                this.userError.next(error.text());
                console.log(error.text());
            }
        );
    }
}
