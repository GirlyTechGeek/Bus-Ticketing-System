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
      icon: 'easel'
    },
    {
      title: 'Deposit',
      url: '/deposit',
      icon: 'film'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'film'
    },
    {
      title: 'Loan',
      url: '/loan',
      icon: 'film'
    },
    {
      title: 'Redeem',
      url: '/redeem',
      icon: 'film'
    },
    {
      title: 'Calculator',
      url: '/calculator',
      icon: 'film'
    },
    {
      title: 'Estatement',
      url: '/e-statement',
      icon: 'film'
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'film'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'film'
    },
    {
      title: 'Change Pin',
      url: '/change-pin',
      icon: 'film'
    },
    {
      title: 'Tell A Friend',
      url: '/tell-a-friend',
      icon: 'film'
    },
    {
      title: 'Contact Us',
      url: '/contact',
      icon: 'film'
    },
    {
      title: 'Sign out',
      url: '/login',
      icon: 'film'
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
