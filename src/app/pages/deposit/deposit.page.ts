import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {PaystackOptions} from 'angular4-paystack';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  oneway = false;
  results: any ;
  title: any;
  brands: any;
  brand: any;
  findLocation: any;
  today = new Date().toJSON().split('T')[0];
  fares: any;
  fares1: any;
  to = localStorage.getItem('fare');
  options: PaystackOptions = {
    amount: parseInt(this.to),
    email: 'asunkaa41@gmail.com',
    ref: `${Math.ceil(Math.random() * 10e10)}`,
    currency: 'GHS',
  };
  public toggle = false;
  public payment = false;
  public changePayment = false;
  public changeToggle = false;
  public locations =[
        {id: 1, location: 'accra'},
        {id: 1, location: 'accra'},
        {id: 1, location: 'accra'},
        {id: 1, location: 'accra1'},
        {id: 1, location: 'accra2'},
        {id: 1, location: 'accra'},
        {id: 1, location: 'accra'}
  ];

  private busy: any;
  public form: FormGroup;
  public form1: FormGroup;
  public usersName: any;
  public usersNum: any;

  constructor(
    public modalController: ModalController,
    private loader: LoadingController,
    private dataService: ApiService,
    private builder: FormBuilder,
    private alert: AlertController,
    private router: Router,
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
    this.form1 = builder.group({
      // userID: [''],
      destination1: [''],
      departureLocation1: [''],
      departureDate1: [''],
      // returnDate: [''],
      time1: [''],
      userName: [''],
      hasPaid: ['']
    });
  }
  departureLocation;
  departureDate;
  destination;

  ngOnInit() {
    this.ionViewWillEnter();
    this.usersName = localStorage.getItem('user');
    this.usersNum = localStorage.getItem('number');

  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
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

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
    this.loader.dismiss();
  }

  paymentCancel() {
    console.log('payment failed');
    this.loader.dismiss();
  }
  bookOneway(){
    this.oneway = !this.oneway;
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
      localStorage.setItem('seats', this.results[0].seats);
      localStorage.setItem('fare', this.results[0].fare);
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
              this.toggle = true;
              this.changeToggle = true;
            }
          }
        ]
      });
      await pop.present();
    },(err: any) => {
        console.log(err);
        this.loader.dismiss();
        this.notify(`Ooops. There are no available buses to ${this.form.value.destination} . Please try again later.`);
      });
    });
  }

  async finalSubmit() {
    // return this.freeze().then(async () => {
      const newSeat = localStorage.getItem('seats');
      console.log(newSeat);
      const tryDate = this.form.value.time.split('T')[1];
      await this.dataService.bookTrip(
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
        this.usersNum
      )
        .subscribe(
          async () => {
              // await this.loader.dismiss()
              const pop1 = await this.alert.create({
                header: 'Confirmation',
                subHeader: 'Payment Option',
                message: 'Please confirm to pay for your travels',
                cssClass: 'sw-pop',
                backdropDismiss: false,
                mode: 'ios',
                buttons: [
                  {text: 'Cancel', role: 'cancel'},
                  {
                    text: 'Confirm',
                    role: 'confirm',
                    handler: async () =>{
                      this.payment = true;
                      this.changePayment = true;
                      }
                  }
                ]
              });
              await pop1.present();
              // this.bookOneway();
            // this.loader.dismiss()
          },
          (err: any) => {
            console.log(err);
            // this.loader.dismiss()
            this.notify(`Ooops. Unable to complete your Request. Please try again.`);
          }
        );
      // this.location.back();
    // });
  }
  submit1() {
    // const msg = 'You have successfully updated your profile';
    return this.freeze().then(async () => {
      await this.dataService.getAvailability(
        this.form1.value.destination1,
        this.form1.value.departureDate1.split('T')[0],
      ).subscribe(async (res) => {
        this.results = res;
        console.log(this.results[0]);
        this.fares1 = this.results[0].fare;
        this.brands = this.results[0].brand;
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
                this.toggle = true;
              }
            }
          ]
        });
        await pop.present();
      },(err: any) => {
        console.log(err);
        this.loader.dismiss();
        this.notify(`Ooops. There are no available buses to ${this.form.value.destination} . Please try again later.`);
      });


    });

    // return this.freeze().then(async () => {
    //   const data = {
    //     destination: this.destination,
    //     departureLocation: this.departureLocation,
    //     departureDate: this.departureDate ,
    //     // returnDate: this.form1.value.returnDate,
    //     userName: this.usersName,
    //   }
    //   await this.dataService.bookOneWayTrip(
    //    this.destination,
    //     this.departureLocation,
    //     this.departureDate.split('T')[0] ,
    //      this.usersName,
    //     'false'
    //   )
    //     .subscribe(
    //       async () => {
    //         this.notify(msg);
    //         this.form.reset();
    //         // const redirect = this.toggle();
    //         // await this.router.navigate([redirect]);
    //         await this.loader.dismiss();
    //       },
    //       (err: any) => {
    //         console.log(err)
    //         this.loader.dismiss()
    //         return this.notify('Ooops. Unable to complete your Request. Please try again.');
    //       });
    // });
  }
  // async payment(){
  //   const mobile_money = {
  //     phone: '0551234987',
  //     provider: 'mtn'
  //   }
  //   await this.dataService.makePayment(
  //     300,
  //     'asunkaa41@gmail.com',
  //     'GHS',
  //     mobile_money,
  //   ).toPromise();
  // }
pay(){
    this.payment = !this.payment;
}
  async final1Submit() {
    // return this.freeze().then(async () => {
      const tryDate = this.form1.value.time1.split('T')[1];
      await this.dataService.bookTrip(
        this.form1.value.destination1,
        this.form1.value.departureLocation1,
        this.form1.value.departureDate1.split('T')[0],
        this.form1.value.departureDate1.split('T')[0],
        this.usersName,
        'false',
        this.findLocation,
        this.fares1,
        tryDate.split('.')[0].toString(),
        this.brands,
        this.usersNum
      )
        .subscribe(
          async () => {
            // await this.loader.dismiss()
            const pop1 = await this.alert.create({
              header: 'Confirmation',
              subHeader: 'Payment Options',
              message: 'Please continue to pay for your travel',
              cssClass: 'sw-pop',
              backdropDismiss: false,
              mode: 'ios',
              buttons: [
                {text: 'Cancel', role: 'cancel'},
                {
                  text: 'Confirm',
                  role: 'confirm',
                  handler: async () =>{
                    this.changePayment = true;
                    this.payment = true;
                  }

                }
              ]
            });
            await pop1.present();
            // this.bookOneway();
            // await this.loader.dismiss()
          },
          (err: any) => {
            console.log(err);
            // this.loader.dismiss()
            this.notify(`Ooops. Unable to complete your Request. Please try again.`);
          }
        );
      // this.location.back();
    // });
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
