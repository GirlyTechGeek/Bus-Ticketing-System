import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {LoadingController} from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  tripResults: any;
  private busy: any;
  tripId: any
  constructor(
    private dataService: ApiService,
    private loader: LoadingController,
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter = () => {
    this.freeze().then(async () => {
      this.dataService.getTrips(localStorage.getItem('user')).subscribe(async (res) => {
        this.tripResults = JSON.parse(JSON.stringify(res)) ;
        await this.loader.dismiss();
        console.log(this.tripResults);
      });
    });
  }
  firstEdit(id: any, from: any, to: any, dep: any, ret: any, time: any){
     this.tripId = id
    sessionStorage.setItem('ID', id);
    sessionStorage.setItem('from', from);
    sessionStorage.setItem('to', to);
    sessionStorage.setItem('dep', dep);
    sessionStorage.setItem('ret', ret);
    sessionStorage.setItem('time', time);
    this.router.navigate(['/edit-trip']);
  }

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
