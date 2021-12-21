import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {ActionSheetController, Platform, ModalController} from '@ionic/angular';
import { ApiService } from './api.service';
import {BannerPage} from './pages/banner/banner.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentPageTitle = 'Dashboard';
  loginbtn: boolean;
  logoutbtn: boolean;
  appPages = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'bar-chart'
    },
    {
      title: 'Booking',
      url: '/booking',
      icon: 'ticket'
    },
    {
      title: 'Trips',
      url: '/trips',
      icon: 'bus'
    },
    {
      title: 'Messages',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Sign out',
      url: '/login',
      icon: 'exit'
    },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private dataService: ApiService,
    private actionSheetController: ActionSheetController,
    public modalController: ModalController,
  ) {
    this.initializeApp();
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if (this.dataService.isLoggedIn()) {
      console.log('loggedin');
      this.loginbtn = false;
      this.logoutbtn = true;
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }

  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this.dataService.deleteToken();
    window.location.href = window.location.href;
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        { text: 'Privacy' },
        { text: 'Security' },
        { text: 'Sign Out', role: 'destructive', handler: async () =>
            await this.router.navigate(['/login'])},
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  async presentModal(){
    const modal = await this.modalController.create({
      component: BannerPage,
    });
     await modal.present();
  }
}





