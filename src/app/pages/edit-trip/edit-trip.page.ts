import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {ApiService} from '../../api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.page.html',
  styleUrls: ['./edit-trip.page.scss'],
})
export class EditTripPage implements OnInit {
  results: any ;
  fares: any;
  brand: any;
  from:any;
  to:any;
  dept: any;
  timed:any;
  ret:any;
  newId: any;
  findLocation: any;
  private busy: any;
  public form: FormGroup;
  public usersName: any;
  constructor(
    private loader: LoadingController,
    private dataService: ApiService,
    private builder: FormBuilder,
    private alert: AlertController,
    private location: LocationStrategy
  ) {
    this.form = builder.group({
      // userID: [''],
      destination: [''],
      departureLocation: [''],
      departureDate: [''],
      returnDate: [''],
      time: [''],
      userName: [''],
      hasPaid: [''],
      pickupLocation: ['']
    });
  }

  ngOnInit() {
    this.newId = sessionStorage.getItem('ID');
    this.usersName = localStorage.getItem('user');
    this.from = sessionStorage.getItem('from');
    this.to = sessionStorage.getItem('to');
    this.dept = sessionStorage.getItem('dep');
   this.ret = sessionStorage.getItem('ret');
   this.timed = sessionStorage.getItem('time');
  }

  customActionSheetOptions: any = {
    header: 'Location',
    subHeader: 'Select a pickup location',
  };
  ionViewWillEnter = () => {
    // setInterval( ()=>{
    this.dataService.getLocations().then(async (res) => {
        this.results = res;
        console.log(res);
      }
    );
    // }, 20000);
  };

  async submit() {
    return this.freeze().then(async () => {
      await this.dataService.getAvailability(
        // this.form.value.departureLocation,
        this.form.value.destination,
        this.form.value.departureDate.split('T')[0],
      ).subscribe(async (res) => {
        this.results = res;
        console.log(this.results[0]);
        this.fares = this.results[0].fare;
        this.brand = this.results[0].brand;
        // this.newId = this.results[0].tripID;
        localStorage.setItem('seats', this.results[0].seats);
        await this.loader.dismiss();
        const pop = await this.alert.create({
          header: 'Confirmation',
          subHeader: 'Buses available',
          message: `Price GHC ${this.results[0].fare}`  +
            '<br>Please continue to submit your booking request',
          cssClass: 'sw-pop',
          backdropDismiss: false,
          mode: 'ios',
          buttons: [
            {text: 'Cancel', role: 'cancel'},
            {
              text: 'Confirm',
              role: 'confirm',
              handler: async (data) => {
                this.finalSubmit()
              }
            }
          ]
        });
        await pop.present();
      },(err: any) => {
        console.log(err)
        this.loader.dismiss()
        this.notify(`Ooops. There are no available buses to ${this.form.value.destination} . Please try again later.`);
      });


    });
  }
  async finalSubmit() {
    return this.freeze().then(async () => {
      const newSeat = localStorage.getItem('seats');
      console.log(newSeat)
      const tryDate = this.form.value.time.split('T')[1]
      await this.dataService.editTrip(
        this.form.value.destination,
        this.form.value.departureLocation,
        this.form.value.departureDate.split('T')[0],
        this.form.value.returnDate.split('T')[0],
        this.usersName,
        'false',
        this.findLocation,
        this.fares,
        tryDate.split('.')[0].toString(),
        this.brand,
        this.newId
      )
        .subscribe(
          async () => {
            await this.loader.dismiss()
            const pop1 = await this.alert.create({
              header: 'Confirmation',
              subHeader: 'Buses available',
              message: 'Please continue to submit your travel request',
              cssClass: 'sw-pop',
              backdropDismiss: false,
              mode: 'ios',
              buttons: [
                {text: 'Cancel', role: 'cancel'},
                {
                  text: 'Confirm',
                  role: 'confirm',
                  handler: (async =>{
                    this.location.back();
                  })
                }
              ]
            });
            await pop1.present();
          },
          (err: any) => {
            console.log(err)
            this.loader.dismiss()
            this.notify(`Ooops. Unable to complete your Request. Please try again.`);
          }
        );
      sessionStorage.clear();

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
