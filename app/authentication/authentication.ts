import {Headers, Request, RequestMethod} from 'angular2/http';
import { Inject } from 'angular2/core';
import {CsrfHttp} from '../csrf/csrfHttp';
import {CsrfService} from '../csrf/csrfService';
import {addHeaderTest, filterResponseTest} from '../interceptors/interceptors';
import 'rxjs/add/operator/map'

export class Credentials {
    public username:string;
    public password: string;
    constructor(){}
}

export class AuthenticationService {
    authenticated: boolean;
    http:CsrfHttp;
    
    constructor(@Inject(CsrfHttp)http:CsrfHttp){
        this.http = http;
    }
    
    isAuthenticated() {
        this.authenticated;
    }
    
    authenticate(credentials:Credentials, callback:any) {
        
        var headers = new Headers();
        console.log("authentication for: ", credentials);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', "Basic " + btoa(credentials.username + ":" + credentials.password));
        console.log('attempting login');
        this.http.request(new Request({url:'/transport/users/' + credentials.username, method: RequestMethod.Get, headers: headers}))
            .subscribe(
                data => {
                    console.log("I got some data", data);
                },
                err => {
                    console.log("an error occurred ", err);
                }
                
            )
    }
    
    logout() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Requested-With', 'XMLHttpRequest');
        this.http.request(new Request({url:'/transport/logout', method: RequestMethod.Post}))
            .subscribe(
                data=>{console.log("I got data: ", data)},
                err=>{console.log(err)}
            )
    }
}