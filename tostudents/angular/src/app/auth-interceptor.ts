import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

// ...

const username  = 'Hilda';
const password  = 'hilda';

const friends   = ['alice', 'bob', 'malle'];

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhpbGRhQiIsImlhdCI6MTUxNjIzOTAyMn0.FWDXHkJEaqz4S-SdXBRquIvclUoDdKydHXXPUEsmN-k';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { 
        body,       // object
        headers,    // object
        method,     // string
        url,        // string
    } = req;

    if(url === '/login'){
    if(body.username === username && body.password === password){
      return makeResponse({
        token: token
      });
    }
    else {
      return makeError(401, 'Failed to login');
    }
    } else {
      makeError(500, {})
    }
    if(url ==='/friends'){
      if(headers.has("Authorization")){
        if(headers.get("Authorization")=== `Bearer ${token}`){
          return makeResponse({friends})
        }else{
          return makeError(401, 'Unauthorized token')
        }
      }else{
        return makeError(400, 'No authorization header')
      }
    } else{
      return makeError(500, {})
    }
  }
}
