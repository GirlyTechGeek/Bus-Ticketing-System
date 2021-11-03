import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {Storage} from '@ionic/storage';
import {forkJoin} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl: string;
    private readonly apiKey: string;
    private readonly email: string;

    // constructor
    constructor(private http: HttpClient,
                private sanitizer: DomSanitizer, private db: Storage) {
        this.baseUrl = 'https://api.dalexswift.com/api';
        this.apiKey = 'c24d21fd-4995-440b-af63-73a5ad0e8d4a';
        this.email = 'linqworth@dalexswift.com';
    }

    // get token
    public requestJWT(): Promise<any> {
        const data = {emailAddress: this.email, securityKey: this.apiKey};
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/Token', data, {
            headers: head
        }).toPromise();
    }

    // request OTP
    public requestOTP(data: any): Promise<any> {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/SendOTP', data, {
            headers: head
        }).toPromise();
    }

    // create account
    public createAccount(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/Create', data, {
            headers: head
        }).toPromise();
    }

    // accept terms
    public acceptTerms(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/AcceptTerms', data, {
            headers: head
        }).toPromise();
    }

    // login
    public signin(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/Login', data, {
            headers: head
        }).toPromise();
    }

    // profile
    public profile(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/Profile', data, {
            headers: head
        }).toPromise();
    }

    // update profile
    public update(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/Update', data, {
            headers: head
        }).toPromise();
    }

    // change pin
    public password(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Account/UpdatePin', data, {
            headers: head
        }).toPromise();
    }

    // sign-out
    async signout() {
        return await this.db.get('user').then(async (user) => {
            return await this.db.clear().then(async () => {
                return await this.db.set('prev', user);
            });
        });
    }

    // deposit
    public deposit(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        let link = this.baseUrl + '/Payments/MobileMoney';
        if (data.mode === 'card') {
            link = this.baseUrl + '/Payments/Cards';
            data.returnPage = window.location.origin + '/u/dashboard';
        }
        delete data.link;
        delete data.mode;
        return this.http.post(link, data, {
            headers: head
        }).toPromise();
    }

    // get loan data
    public qLoan(data: any) {
        return forkJoin([
            this.http.get(this.baseUrl + '/Loan/Balance?phoneNumber=' + data),
            this.http.get(this.baseUrl + '/Loan/Limit?phoneNumber=' + data)
        ]).toPromise();
    }

    // loan
    public loan(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Loan/Request', data, {
            headers: head
        }).toPromise();
    }

    // balance
    public balance(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.baseUrl + '/Loan/Balance?phoneNumber=' + data, {
            headers: head
        }).toPromise();
    }

    // limit
    public limit(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.baseUrl + '/Loan/Limit?phoneNumber=' + data, {
            headers: head
        }).toPromise();
    }

    // redeem
    public redeem(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Redemption/Redeem', data, {
            headers: head
        }).toPromise();
    }

    // calculate
    public calculate(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Investment/Calculator', data, {
            headers: head
        }).toPromise();
    }

    // has goals
    public hasGoal(phoneNo: string) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.baseUrl + '/Investment/HasGoal?phoneNo=' + phoneNo, {
            headers: head
        }).toPromise();
    }

    // set goal
    public setGoal(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Investment/SetGoal', data, {
            headers: head
        }).toPromise();
    }

    // get goal
    public getGoal(phoneNo: string) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.baseUrl + '/Investment/GetCurrentGoal?phoneNo=' + phoneNo, {
            headers: head
        }).toPromise();
    }

    // update goal
    public updateGoal(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Investment/UpdateGoal', data, {
            headers: head
        }).toPromise();
    }

    // upload photo
    public uploadPhoto(photo: any) {
        const model = new FormData();
        model.append('files', photo);
        const head = new HttpHeaders({'Content-Type': 'multipart/form-data'});
        return this.http.post(this.baseUrl + '/Photo', model).toPromise();
    }

    // mini statement
    public miniStatement(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Investment/MiniStatements', data, {
            headers: head
        }).toPromise();
    }

    public qDash(data: any) {
        return forkJoin([
            this.http.post(this.baseUrl + '/Account/AccountBalances', data),
            this.http.post(this.baseUrl + '/Investment/MiniStatements', data),
           // this.http.get(this.baseUrl + '/Investment/GetCurrentGoal?phoneNo=' + data.phoneNumber)
        ]).toPromise();
    }

    // transactions
    public transactions(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Investment/Transactions', data, {
            headers: head
        }).toPromise();
    }

    // push subscription
    public subscribe(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('https://fcm.dalexswift.com', data, {
            headers: head
        }).toPromise();
    }

    // banners
    public banners() {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get('https://cdn.dalexswift.com/banners', {
            headers: head
        }).toPromise();
    }

    // messages
    public messages(id: string) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.baseUrl + '/Messages/Messages?id=' + id, {
            headers: head
        }).toPromise();
    }

    // mark as read
    public readMessage(data: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl + '/Messages/Read', data, {
            headers: head
        }).toPromise();
    }

    // mark as read
    public getEStatement(phoneNum: number, startDt: any, endDt: any) {
        const head = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<any>('https://dalex-e-statement.herokuapp.com/api/v1/generateStatement', {
            phoneNumber: phoneNum,
            startDate: startDt,
            endDate: endDt
        }, {
            headers: head
        }).toPromise();
    }
}
