import {Component, Inject} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {CsrfHttp} from '../csrf/csrfHttp';
import {Credentials, AuthenticationService} from '../authentication/authentication';


@Component ({
    selector: 'login',
    templateUrl: 'app/login/login.html',
    directives: [],
    providers: [CsrfHttp]
})

export class Login {
    credentials:Credentials;
    constructor(@Inject(CsrfHttp)http:CsrfHttp, @Inject(AuthenticationService)public authenticationService:AuthenticationService) {
        this.credentials = new Credentials();
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