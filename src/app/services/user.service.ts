import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class UserService implements Resolve<any> {
    constructor(private db: Storage) {}

    // filter
    async resolve(route: ActivatedRouteSnapshot): Promise<any> {
        return await this.db.get('user').then(user => {
            return user;
        });
    }
}
