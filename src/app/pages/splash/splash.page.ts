import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';
// import {ApiService} from '../../services/api.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-splash',
    templateUrl: './splash.page.html',
    styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
    constructor(
        private menu: MenuController,
        // private api: ApiService,
        public storage: Storage,
        private router: Router) {
        this.menu.enable(false);
    }

    ngOnInit = () => {};
    ionViewWillEnter = async () => {
        // return await this.api.signout().then(async () => {
        //     return await this.api.requestJWT().then(async (res) => {
                if (6000) {
                    // this.storage?.set('auth', res.token.toString()).then(async () => {
                        return this.router.navigate(['/login']).then(() => {
                            // window.location.reload();
                        });
                    // });
                }
        //     });
        // });
    }
}
