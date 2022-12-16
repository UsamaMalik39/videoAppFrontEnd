import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Location  } from '@angular/common';


@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private location: Location){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let access_token =  localStorage.getItem("access_token");
    if(!access_token){
      access_token = '';
    }
  
    const customReq = request.clone({      
      headers: request.headers
                  .set("authorization","bearer "+access_token)
    });    
    

    return next.handle(customReq).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
 
        }
      }),
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }
        return throwError(response);
      })
    );
  }
}
