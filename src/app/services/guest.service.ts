import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {MenuController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class GuestService implements CanActivate {
    constructor(private menu: MenuController,
                private router: Router,
                private db: Storage) {

    }

    // filter
    async canActivate(): Promise<boolean> {
        return await this.db.get('user').then(async user => {
            if (user === null) {
                return true;
            } else {
                return await this.menu.enable(true).then(async () => {
                    return await this.router.navigate(['/u/banner']).then(() => {
                        return false;
                    });
                });
            }
        });
    }
}
