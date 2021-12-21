import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  oneway = false;
  results: any ;
  findLocation: any;
  public toggle = false;
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
  constructor(
    public modalController: ModalController,
    private loader: LoadingController,
    private dataService: ApiService,
    private builder: FormBuilder,
    private alert: AlertController,
    private router: Router,
  ) {
    this.form = builder.group({
      // userID: [''],
      destination: [''],
      departureLocation: [''],
      departureDate: [''],
      returnDate: [''],
      // currentLocation: [''],
      userName: [''],
      hasPaid: [''],
      pickupLocation: ['']
    });
    this.form1 = builder.group({
      // userID: [''],
      destination: [''],
      departureLocation: [''],
      departureDate: [''],
      // returnDate: [''],
      // currentLocation: [''],
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
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  customActionSheetOptions: any = {
    header: 'Location',
    subHeader: 'Select a pickup location',
  };
  ionViewWillEnter = () => {
    this.dataService.getBooking().then(async (res) => {
      this.results = res;
      console.log(res);
    });
  };
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
    const msg = 'You have successfully updated your profile';
    return this.freeze().then(async () => {
    await this.dataService.getAvailability(
      this.form.value.destination,
      this.form.value.departureDate.split('T')[0],
    ).subscribe(async (res) => {
      this.results = res;
      console.log(this.results[0]);
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
        console.log(err)
        this.loader.dismiss()
        this.notify(`Ooops. There are no available buses to ${this.form.value.destination} . Please try again later.`);
      });


    });
  }
  async finalSubmit() {
    return this.freeze().then(async () => {
      await this.dataService.bookTrip(
        this.form.value.destination,
        this.form.value.departureLocation,
        this.form.value.departureDate.split('T')[0],
        this.form.value.returnDate.split('T')[0],
        this.usersName,
        'false',
        this.findLocation
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
                  }
                ]
              });
              await pop1.present();
              this.bookOneway();
          },
          (err: any) => {
            console.log(err)
            this.loader.dismiss()
            this.notify(`Ooops. Unable to complete your Request. Please try again.`);
          }
        );
    });
  }
  submit1() {
    const msg = 'You have successfully updated your profile';
    return this.freeze().then(async () => {
      await this.dataService.getAvailability(
        this.form.value.destination,
        this.form.value.departureDate.split('T')[0],
      ).subscribe(async (res) => {
        this.results = res;
        console.log(this.results[0]);
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
        console.log(err)
        this.loader.dismiss()
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
  async final1Submit() {
    return this.freeze().then(async () => {
      await this.dataService.bookOneWayTrip(
        this.form.value.destination,
        this.form.value.departureLocation,
        this.form.value.departureDate.split('T')[0],
        this.usersName,
        'false',
        this.findLocation
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
                }
              ]
            });
            await pop1.present();
            this.bookOneway();
          },
          (err: any) => {
            console.log(err)
            this.loader.dismiss()
            this.notify(`Ooops. Unable to complete your Request. Please try again.`);
          }
        );
    });
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
