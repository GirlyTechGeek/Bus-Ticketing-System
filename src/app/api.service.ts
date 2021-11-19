import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './models/users';
import { environment } from '../environments/environment'

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    redirectUrl: string;
    baseUrl = environment.apiUrl;
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    constructor(private httpClient: HttpClient) { }
    public userlogin(phoneNumber: any, pin: any) {
        return this.httpClient.post<any>(this.baseUrl + '/login.php', { phoneNumber, pin })
            .pipe(map(Users => {
                this.setToken(phoneNumber + pin);
                this.getLoggedInName.emit(true);
                return Users;
            }));
    }

    public userregistration(firstName: any, lastName: any, pin: any, phoneNumber: any) {
        return this.httpClient.post<any>(this.baseUrl + '/register.php', { firstName, lastName, pin, phoneNumber })
            .pipe(map(Users => {
                return Users;
            }));
    }

    //token
    setToken(token: string) {
        localStorage.setItem('token', token);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    deleteToken() {
        localStorage.removeItem('token');
    }
    isLoggedIn() {
        const usertoken = this.getToken();
        if (usertoken != null) {
            return true
        }
        return false;
    }
}