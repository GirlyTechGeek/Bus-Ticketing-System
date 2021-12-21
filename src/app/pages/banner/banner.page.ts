import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from '../../api.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {
  currentModel = null;
  toggleScreen = false;
  public form: FormGroup;
  private busy: any;
  userN: any;
  firstN: any;
  second: any;
  numberP: any
  constructor(
    public modalController: ModalController,
    private loader: LoadingController,
    private dataService: ApiService,
    private builder: FormBuilder,
    private alert: AlertController,
    private router: Router,
  ) {
    this.firstN = localStorage.getItem('first');
    this.userN = localStorage.getItem('user');
    this.second =localStorage.getItem('second');
    this.numberP = localStorage.getItem('number');
    this.form = builder.group({
      phoneNumber: [this.numberP],
      // userName: [''],
      firstName: [ this.firstN],
      lastName: [this.second],
      userName: [this.userN],
    });
  }

  ngOnInit() {
    this.firstN = localStorage.getItem('first');
    this.second =localStorage.getItem('second');
    this.numberP = localStorage.getItem('number');
    this.userN = localStorage.getItem('user');
  }
  editPage(){
      this.toggleScreen = !this.toggleScreen;
      console.log(this.second);
  }
  dismissed() {
   return  this.modalController.dismiss();
  }
  submit() {
    const msg = 'You have successfully updated your profile';
    return this.freeze().then(async () => {
      await this.dataService.updateUser(
        this.form.value.firstName, this.form.value.lastName, this.form.value.phoneNumber, this.form.value.userName,
      )
        .subscribe(
          async () => {
            this.notify(msg);
            this.form.reset();
            // const redirect = this.toggle();
            // await this.router.navigate([redirect]);
            await this.loader.dismiss();
            this.editPage();
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
}
