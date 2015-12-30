import {Http, Request} from 'angular2/http';

export function addHeaderTest(request:Request):Request {
    let headers = request.headers;
    headers.append('Brian', 'Rules');
    return request;
}

export function filterResponseTest(value:any, index:any, observable:any):any {
    console.log("I'm a-firin mah filter: ", value);
    return observable;
    
}