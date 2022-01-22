import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, MenuController} from '@ionic/angular';
import {} from 'googlemaps';
import {ApiService} from "../../api.service";
import {DatePipe} from "@angular/common";
import {Router} from '@angular/router';

let map: google.maps.Map;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {
  user: any;
  tripResults: any;
  private busy: any;
  dateChecker: any = new Date();
  constructor(
    private menu: MenuController,
    private dataService: ApiService,
    private loader: LoadingController,
    private ref: ChangeDetectorRef,
    private dataPipe: DatePipe,
    private router: Router,
    private alert: AlertController,
    ) { }


  //  initMap(): void {
  //   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }
  ngOnInit() {
    this.user = localStorage.getItem('user');
  }
  ionViewWillEnter = () => {
    this.freeze().then(async () => {
      this.dataService.getTrips(localStorage.getItem('user')).subscribe(async (res) => {
        this.tripResults = JSON.parse(JSON.stringify(res)) ;
        await this.loader.dismiss();
        console.log(this.tripResults);
        this.dateChecker = this.dataPipe.transform(this.dateChecker, 'yyyy-MM-dd');
      }, (err: any) => {
        console.log(err);
        this.loader.dismiss();
      } );
    });
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
  // show alert
  async notify(text, after = null) {
    this.loader.getTop().then(async (p) => {
      p ? await p.dismiss() : null;
      const msg = await this.alert.create({
        header: 'Attention!',
        message: text,
        mode: 'ios',
        buttons: ['OK']
      });
      msg.onDidDismiss().then(after);
      return await msg.present();
    });
  }

}
