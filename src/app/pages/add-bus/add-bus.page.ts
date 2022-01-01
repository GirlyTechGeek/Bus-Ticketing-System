import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.page.html',
  styleUrls: ['./add-bus.page.scss'],
})
export class AddBusPage implements OnInit {
  public form: FormGroup;
  private busy: any;
  constructor(
    private location: LocationStrategy,
    private loader: LoadingController,
    private dataService: ApiService,
    private builder: FormBuilder,
    private alert: AlertController,
    private router: Router,
  ) {
    this.form = builder.group({
      driver: [''],
      returnDate: [''],
      departureDate: [''],
      locations: [''],
      fare: [''],
      destination: [''],
      seats: [''],
      brand: [''],
      phoneNumber: ['']
    });
  }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }
  async submit() {
    return this.freeze().then(async () => {
      await this.dataService.getBus(
        this.form.value.driver,
        this.form.value.returnDate.split('T')[0],
        this.form.value.departureDate.split('T')[0],
        this.form.value.locations,
        this.form.value.fare,
        this.form.value.destination,
        this.form.value.seats,
        this.form.value.brand,
        this.form.value.phoneNumber
      )
        .subscribe(
          async () => {
            await this.loader.dismiss();
            const pop1 = await this.alert.create({
              header: 'Confirmation',
              // subHeader: 'Buses available',
              message: 'Request Successful',
              cssClass: 'sw-pop',
              backdropDismiss: false,
              mode: 'ios',
              buttons: [
                {text: 'Ok', role: 'confirm'},
              ]
            });
            this.form.reset();
            await pop1.present();
          },
          (err: any) => {
            console.log(err);
            this.loader.dismiss();
            this.notify(`Ooops. Unable to complete your Request. Please try again.`);
          }
        );
      // this.location.back();
    });
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
