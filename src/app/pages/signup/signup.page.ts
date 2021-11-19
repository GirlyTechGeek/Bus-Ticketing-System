import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private busy: any;
  pin: any;
  public form: FormGroup;

  constructor(
    public menuCtrl: MenuController,
    private menu: MenuController,
    private alert: AlertController,
    private loader: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: ApiService
  ) {
    this.menu.enable(false);
    this.form = fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:[0-9]{10},)*[0-9]{10}$')]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      pin: [''],
    });
  }

  ngOnInit() {
  }
  generatePin(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  async submit() {
    const pin = this.generatePin();
    this.pin = pin
    const msg = `Your pin is ${this.pin}`;
    return this.freeze().then(async () => {
      this.form.patchValue({
        pin: this.pin
      })
      await this.dataService.userregistration(this.form.value.firstName, this.form.value.lastName, this.form.value.pin, this.form.value.phoneNumber)
        .subscribe(async () => {
          this.notify(msg);
          this.form.reset();
          const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/login';
          this.router.navigate([redirect]);
        },
          (err: any) => {
            console.log(err)
            this.loader.dismiss()
            return this.notify('Ooops. Unable to complete your Request. Please try again.');
            // alert("User name or password is incorrect")
          });
    });
  }

  async submits() {
    const pin = this.generatePin();
    this.pin = pin
    const msg = `Your pin is ${this.pin}`;
    return this.freeze().then(() => {
      return this.notify(msg);
      // if (this.form.valid) {
      //     // @ts-ignore
      //     if (res.phone != null && res.phone !== '') {
      //       // @ts-ignore
      //       this.api.profile({ phoneNumber: res.phone }).then(async (usr) => {
      //         this.db.set('user', usr).then(() => {
      //           this.form.reset();
      //           this.loader.dismiss().then(() => {
      //             return this.router.navigate(['/dashboard']).then(() => {
      //               window.location.reload();
      //             });
      //           });
      //         });
      //       });
      //     } else { }
      // }
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
  get email() { return this.form.get('lastname'); }
  get password() { return this.form.get('pin'); }
  get name() { return this.form.get('firstName'); }
}
