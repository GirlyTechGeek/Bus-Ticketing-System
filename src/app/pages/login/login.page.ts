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
  }

  ngOnInit() {

  }
  submit() {
    return this.freeze().then(async () => {
      await this.dataService.userlogin(this.form.value.phoneNumber, this.form.value.pin)
        .subscribe(
          async () => {
            this.form.reset();
            const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
            this.router.navigate([redirect]);
            this.loader.dismiss()
          },
          (err: any) => {
            console.log(err)
            this.loader.dismiss()
            return this.notify('Ooops. Unable to complete your Request. Please try again.');
          });
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
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get pin() { return this.form.get('pin'); }
}
