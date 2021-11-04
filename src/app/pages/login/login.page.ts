import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
    
  }
  // ionViewWillEnter(){
  //   this.menuCtrl.enable(false)
  // }
}
