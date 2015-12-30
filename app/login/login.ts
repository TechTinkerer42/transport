import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {Credentials, AuthenticationService} from '../authentication/authentication';


@Component ({
    selector: 'login',
    templateUrl: 'app/login/login.html',
    directives: []
})

export class Login {
    credentials:Credentials;
    constructor(public http:Http, public authenticationService:AuthenticationService) {
        this.credentials = new Credentials();
        authenticationService.forceHeaders();
    }
    
    public login() {
        console.log("before logging in the auth status is ", this.authenticationService.authenticated);
        
        this.authenticationService.authenticate(this.credentials, function() {
            console.log('dis is da callback');
        })
    }
    
    public logout() {
        this.authenticationService.logout();
    }
}