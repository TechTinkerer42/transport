import {Http, Headers} from 'angular2/http';
import { Inject } from 'angular2/core';

export class Credentials {
    public username:string;
    public password: string;
    constructor(){}
}

export class AuthenticationService {
    authenticated: boolean;
    http:Http;
    
    constructor(@Inject(Http)http:Http){
        this.http = http;
    }
    
    isAuthenticated() {
        this.authenticated;
    }
    
    forceHeaders() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Requested-With', 'XMLHttpRequest');
    //     this.http.head('http://transportdev.bdpsmart.com/transport/js/app/i18n/transport.js')
    //         .subscribe(
    //             data => {console.log(data)}   
    //         );
    }
    
    authenticate(credentials:Credentials, callback:any) {
        
        var headers = new Headers();
        console.log("authentication for: ", credentials);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Requested-With', 'XMLHttpRequest');
        headers.append('Authorization', "Basic " + btoa(credentials.username + ":" + credentials.password));
        console.log('attempting login');
        this.http.get('/transport/users/' + credentials.username, {headers: headers})
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
        this.http.post('/transport/logout', null)
            .subscribe(
                data=>{console.log(data)},
                err=>{console.log(err)}
            )
    }
}