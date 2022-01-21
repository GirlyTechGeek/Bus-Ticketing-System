import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  newPin: any;
  firstN: any;
  second: any;
  numberP: any
  usr: any;
  toggleScreen = false;
  private busy: any;
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router,
    private alert: AlertController,
    private loader: LoadingController,
  ) {
    this.form = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:[0-9]{10},)*[0-9]{10}$')]],
      pin: ['', Validators.required]
    });
    this.form1 = this.fb.group({
      phoneNumber1: ['', [Validators.required, Validators.pattern('^(?:[0-9]{10},)*[0-9]{10}$')]],
      pin: ['']
    });
  }

  ionViewWillEnter = () => {
    this.toggleScreen = false;
  };
  // toggle screen
  toggle() {
    this.toggleScreen = !this.toggleScreen;
  }
  ngOnInit() {
    localStorage.clear();
  }
  submit() {
    return this.freeze().then(async () => {
      await this.dataService.userlogin(this.form.value.phoneNumber, this.form.value.pin)
        .subscribe(
          async (res) => {
            this.usr = res[0].userName;
            this.firstN = res[0].firstName;
            this.second = res[0].lastName;
            this.numberP = res[0].phoneNumber;
              this.form.reset();
            localStorage.setItem('user',this.usr );
            localStorage.setItem('first',this.firstN );
            localStorage.setItem('second',this.second );
            localStorage.setItem('number',this.numberP );
            // localStorage.setItem('response',JSON.stringify(res) );
            const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
            await this.router.navigate([redirect]);
            await this.loader.dismiss();
          },
          (err: any) => {
            console.log(err);
            this.loader.dismiss();
            return this.notify('Ooops. Unable to complete your Request. Please try again.');
          });
    });
  }
  generatePin(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  submit1() {
    const pin = this.generatePin();
      this.newPin = pin
      const msg = `Your pin is ${this.newPin}`;
      return this.freeze().then(async () => {
        this.form1.patchValue({
          pin: this.newPin
        })
      await this.dataService.requestPin(this.form1.value.phoneNumber1, this.form1.value.pin)
        .subscribe(
          async () => {
            this.notify(msg);
            this.form1.reset();
            const redirect = this.toggle();
            await this.router.navigate([redirect]);
            await this.loader.dismiss();
          },
          (err: any) => {
            console.log(err)
            this.loader.dismiss()
            return this.notify('Ooops. Unable to complete your Request. Please try again.');
          });
    });
  }

  async forgotPassword(){
    const pop = await this.alert.create({
      header: 'Please Confirm',
      subHeader: 'Are you sure?',
      message: 'This will initiate a request to <b> RESET</b> <br/>your <b>PIN CODE</b>. ' +
        '<br/>Do you wish to continue ?',
      cssClass: 'sw-pop',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.toggle();
            // this.router.navigate(['/u/change-pin']).then(() => {
            //
            // });
          }
        }
      ]
    });
    await pop.present();
    // return this.notify('This will initiate a request to <b>CHANGE or RESET</b> <br/>your <b>PIN CODE</b>. ' +
    //   '                                \'<br/>Do you wish to continue ?\'');
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
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get pin() { return this.form.get('pin'); }
}
