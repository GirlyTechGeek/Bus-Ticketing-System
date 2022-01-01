import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../api.service";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  private busy: any;
  pin: any;
  public form: FormGroup;

  constructor(
    private menu: MenuController,
    private alert: AlertController,
    private loader: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: ApiService,
    private location: LocationStrategy,
  ) {
    this.menu.enable(false);
    this.form = fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:[0-9]{10},)*[0-9]{10}$')]],
      firstName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      pin: [''],
    });
  }

  ngOnInit() {
  }
  generatePin(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  back(){
    this.location.back();
  }
  async submit() {
    const pin = this.generatePin();
    this.pin = pin
    const msg = `Your pin is ${this.pin}`;
    return this.freeze().then(async () => {
      this.form.patchValue({
        pin: this.pin
      })
      await this.dataService.userregistration(this.form.value.username,this.form.value.firstName, this.form.value.lastName, this.form.value.pin, this.form.value.phoneNumber)
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
}
