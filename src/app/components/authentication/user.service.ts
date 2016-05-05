import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Subject, ReplaySubject, BehaviorSubject} from 'rxjs';
import {JwtHelper} from 'angular2-jwt';
import {contentHeaders} from '../../utils/headers';
import {User} from '../../models/user';


@Injectable()
export class UserService {

    private port = 9000;
    private signupUrl = 'http://localhost:' + this.port + '/users';
    private loginUrl = 'http://localhost:' + this.port + '/sessions/create';
    private currentUser: User;
    private socketUrl: string = 'http://localhost:9000';
    private socket: Socket;
    
    public authError: Subject<string> = new BehaviorSubject<string>(null);
    public userJoined: Subject<string> = new BehaviorSubject<string>(null);
    
    
    constructor(private http: Http, private jwtHelper: JwtHelper) { 
        var io = require('socket.io-client');
        
        /*
        var jwt = localStorage.getItem('jwt');
        this.socket = io.connect(this.socketUrl, {query: 'token=' + jwt});
        
        /*
        this.socket.on('UserJoined', (user: User) => {
            if(this.currentUser && this.currentUser.id !== user.id)
                console.log('userjoined');
        });
        */
    }

    signup(username: string, password: string, avatar: string): Promise<void> {
        return this.post(this.signupUrl, username, password, 'avatar'); //TODO: avatar
    }

    login(username: string, password: string): Promise<void> {
        return this.post(this.loginUrl, username, password);
    }

    private post(url: string, username: string, password: string, avatar?: string): Promise<void> {

        let body = JSON.stringify({ username, password, avatar });
        return this.http.post(url, body, { headers: contentHeaders }).toPromise()
            .then(response => {
                let userJson = response.json();
                localStorage.setItem('jwt', userJson.id_token);
                this.currentUser = new User(this.jwtHelper.decodeToken(userJson.id_token));
                //this.publishUserJoined(this.currentUser);
            }, error => {
                this.authError.next(error.text());
                console.log(error.text());
            });
    }
    
    getCurrentUser(): User {
        if (this.currentUser == null) {
            let jwt = localStorage.getItem('jwt');
            if (jwt) {
                this.currentUser = new User(this.jwtHelper.decodeToken(jwt));
            } else
                this.authError.next('no user signed in.');
        }
        return this.currentUser;

    }
    /*
    publishUserJoined(user: User): void {
        this.socket.emit('AddUser', this.currentUser);

    }
    */
}
