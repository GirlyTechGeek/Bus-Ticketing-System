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
       setTimeout(async () => this.router.navigate(['/login']), 3000);
    };
}
