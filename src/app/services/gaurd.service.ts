import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class GuardService implements CanActivate {
    constructor(private router: Router, private db: Storage) {

    }

    // filter
    canActivate(): Promise<boolean> {
        return this.db.get('user').then(user => {
            if (user !== null) {
                return true;
            } else {
                this.router.navigate(['/signin']).then(() => {});
                return false;
            }
        });
    }
}
