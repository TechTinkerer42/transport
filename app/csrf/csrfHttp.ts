import {Http, Request, Headers} from 'angular2/http';
import {Inject} from 'angular2/core';
import {CsrfService} from './csrfService';

export class CsrfHttp {
    http:Http;
    csrfService:CsrfService;
    
    constructor(@Inject(Http)http:Http, @Inject(CsrfService) csrfService:CsrfService) {
        this.http = http;
        this.csrfService = csrfService;
    }
    
    public request(request:Request) {
        this.addHeaders(request);
        return this.http.request(request);
    }
    
    addHeaders(request:Request) {
        let headers = request.headers;
        this.csrfService.addCsrfHeader(headers);
        headers.append('X-Requested-With', 'XMLHttpRequest');
    }
}

