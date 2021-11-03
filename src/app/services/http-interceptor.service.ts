import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse, HttpClient
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {ApiService} from './api.service';
import decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    protected url   = 'https://api.dalexswift.com/api';
    protected debug = true;

    constructor(private http: HttpClient,
                private api: ApiService,
                private alertController: AlertController,
                private storage: Storage) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const link = request.url.toLowerCase();
        if (link.includes('swift') && !link.includes('/account/token')) {
            return from(this.token())
                .pipe(
                    switchMap(token => {
                        if (token) {
                            request = request.clone({
                                headers: request.headers.set('Authorization', 'Bearer ' + token)
                            });
                        }

                        if (!request.headers.has('Content-Type') && !link.includes('photo')) {
                            request = request.clone({
                                headers: request.headers.set('Content-Type', 'application/json')
                            });
                        }

                        return next.handle(request).pipe(
                            map((event: HttpEvent<any>) => {
                                if (event instanceof HttpResponse) {
                                    // do nothing for now
                                }
                                return event;
                            }),
                            catchError((error: HttpErrorResponse) => {
                                console.log(error);
                                return throwError(error);
                            })
                        );
                    })
                );
        } else {
            return next.handle(request);
        }
    }

    async token() {
        let token = '';
        return await this.storage.get('auth').then(async (jwt) => {
            token = jwt;
            try {
                const data = decode(token);
                const good = data > Date.now() / 1000;
                // .exp
                if (!good) {
                    return await this.api.requestJWT().then(async (res) => {
                        if (res.token) {
                            token = res.token.toString();
                            return await this.storage.set('auth', token).then(() => {
                                return token;
                            });
                        }
                    });
                } else { return token; }
            } catch (e)  {}
        });
    }
}
