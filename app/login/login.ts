import {Component, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
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
    router:Router;
    constructor(@Inject(CsrfHttp)http:CsrfHttp, @Inject(AuthenticationService)public authenticationService:AuthenticationService, @Inject(Router)router:Router) {
        this.credentials = new Credentials();
        this.router = router;
    }
    
    public login() {
        console.log("before logging in the auth status is ", this.authenticationService.authenticated);
        
        this.authenticationService.authenticate(this.credentials)
            .subscribe(data => {
                console.log("Login data: ", data);
                if (data && data.status == 401) {
                    alert("invalid login attempt, please try again");
                } else {
                    this.router.navigateByUrl('/');
                }
            })
    }
    
    public logout() {
        this.authenticationService.logout()
        .subscribe(
            data=>{console.log("I got data: ", data); return false;},
            err=>{
                // console.log(err);
                if (err.status == 401) {
                    console.log('user successfully logged out');
                    
                    this.router.parent.navigateByUrl ("/");
                } else {
                    console.log('error processing logout', err);
                    
                    return false;
                }
            }
        );
    }
}