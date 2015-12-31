import {Http, Request, Headers} from 'angular2/http';
import {Inject} from 'angular2/core';
import {CsrfService} from './csrfService';
import 'rxjs/add/operator/map';

export class CsrfHttp {
    http:Http;
    csrfService:CsrfService;
    
    constructor(@Inject(Http)http:Http, @Inject(CsrfService) csrfService:CsrfService) {
        this.http = http;
        this.csrfService = csrfService;
    }
    
    public request(request:Request) {
        return requestInternal(this.http, request, this.csrfService);
    }
    
    public setToken() {
        this.csrfService.initToken();
    }
    
    public destroyToken() {
        this.csrfService.destroyToken();
    }
}
    function requestInternal(http:Http, request:Request, csrfService:CsrfService) {
        addHeaders(request, csrfService);
        let observable =  http.request(request).map(function (response:any, index:any, observable:any):any {
            csrfService.getCsrfInfoFromHeaders(response.headers);   
            return response;
        });
        return observable;
    } 
    
    function addHeaders(request:Request, csrfService:CsrfService) {
        let headers = request.headers;
        csrfService.addCsrfHeader(headers);
        headers.append('X-Requested-With', 'XMLHttpRequest');
    }
