import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {ApiService} from "../../api.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.page.html',
  styleUrls: ['./loan.page.scss'],
})
export class LoanPage implements OnInit {
  private busy: any;
  results: any;
  constructor(
    public modalController: ModalController,
    private loader: LoadingController,
    private dataService: ApiService,
    private builder: FormBuilder,
    private alert: AlertController,
    private router: Router,
    private location: LocationStrategy
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter = () => {
    // setInterval( ()=>{
    this.freeze().then(async ()=>{
      this.dataService.getMessages().then(async (res) => {
        await this.loader.dismiss();
          this.results = res;
          // console.log(res);
        }
      );
    });
    // }, 20000);
  };
  // freeze ui
  async freeze() {
    this.busy = await this.loader.create({
      mode: 'ios',
      message: 'Please Wait...',
      cssClass: 'sw-busy',
      keyboardClose: false,
    });
    return await this.busy.present();
  }
}
