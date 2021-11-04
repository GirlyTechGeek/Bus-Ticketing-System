import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentPageTitle = 'Dashboard';

  appPages = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'bar-chart'
    },
    {
      title: 'Deposit',
      url: '/deposit',
      icon: 'wallet'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'list'
    },
    {
      title: 'Loan',
      url: '/loan',
      icon: 'barcode'
    },
    {
      title: 'Redeem',
      url: '/redeem',
      icon: 'cash'
    },
    {
      title: 'Calculator',
      url: '/calculator',
      icon: 'calculator'
    },
    {
      title: 'Estatement',
      url: '/e-statement',
      icon: 'document'
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'notifications'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person-circle'
    },
    {
      title: 'Change Pin',
      url: '/change-pin',
      icon: 'finger-print'
    },
    {
      title: 'Tell A Friend',
      url: '/tell-a-friend',
      icon: 'share'
    },
    {
      title: 'Contact Us',
      url: '/contact',
      icon: 'mail-open'
    },
    {
      title: 'Sign out',
      url: '/login',
      icon: 'exit'
    },
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(()=> {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
  }
}
