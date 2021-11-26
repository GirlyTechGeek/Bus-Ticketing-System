import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {
  currentModel = null;
  toggleScreen = false;
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }
  editPage(){
      this.toggleScreen = !this.toggleScreen
  }
  dismissed() {
   return  this.modalController.dismiss();
  }
}
