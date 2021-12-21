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

    public userregistration(username: any,firstName: any, lastName: any, pin: any, phoneNumber: any) {
        return this.httpClient.post<any>(this.baseUrl + '/register.php', { username, firstName, lastName, pin, phoneNumber })
            .pipe(map(Users => Users));
    }
  public updateUser(firstName: any, lastName: any, phoneNumber: any, userName: any) {
    return this.httpClient.post<any>(this.baseUrl + '/updateProfile.php', { firstName, lastName,userName, phoneNumber })
      .pipe(map(Users => Users));
  }
  public bookTrip(destination: any,departureLocation: any,departureDate: any,returnDate: any,userName: any,hasPaid: any,pickupLocation: any) {
    return this.httpClient.post<any>(this.baseUrl + '/trip.php', { destination,departureLocation,departureDate,returnDate,userName,hasPaid, pickupLocation })
      .pipe(map(Users => Users));
  }
  public bookOneWayTrip(destination: any,departureLocation: any,departureDate: any, userName: any,hasPaid: any,pickupLocation: any ) {
    return this.httpClient.post<any>(this.baseUrl + '/trip.php', { destination,departureLocation,departureDate,userName,hasPaid,pickupLocation })
      .pipe(map(Users => Users));
  }
  public requestPin(phoneNumber: any, pin: any) {
    return this.httpClient.post<any>(this.baseUrl + '/reset.php', { phoneNumber, pin })
      .pipe(map(Users => Users));
  }
  public getBooking() {
    return this.httpClient.get(this.baseUrl + '/booking.php').toPromise();
  }
  public getAvailability(destination: any, departureDate: any ) {
    return this.httpClient.post(this.baseUrl + '/availability.php', {destination, departureDate})
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
      localStorage.removeItem('user');
    }
    isLoggedIn() {
        const usertoken = this.getToken();
        if (usertoken != null) {
            return true
        }
        return false;
    }
}
