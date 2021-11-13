import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
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
