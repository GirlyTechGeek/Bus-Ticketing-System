import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  username: any;
  phoneNumber: any;
  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private alert: AlertController,
    private loader: LoadingController,
    private dataService: ApiService,
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.phoneNumber = localStorage.getItem('number');
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      mode:'ios',
      buttons: [
        { text: 'Privacy'},
        { text: 'Change Pin', role: 'selected', handler: async () =>{
           const pop = await this.alert.create({
              header: 'Change PIN',
              subHeader: 'This will request to reset your PIN CODE',
              // message: '<input placeholder="Enter new PIN"/><b/> <input class="mt-3" placeholder="Confirm PIN"/>',
              cssClass: 'sw-pop',
              backdropDismiss: false,
              mode: 'ios',
             inputs: [
               {name: 'code', type: 'number', placeholder: 'Enter new PIN'},
               {name: 'code', type: 'number', placeholder: 'Confirm PIN'},
             ],
              buttons: [
                {
                  text: 'Confirm',
                  role: 'confirm',
                  handler: async (data) => {
                    this.dataService.requestPin(this.phoneNumber,data.code);
                    // this.router.navigate(['/u/change-pin']).then(() => {
                    //
                    // });
                  }
                }
              ]
            });
            await pop.present();
          }},
        { text: 'Sign Out', role: 'destructive', handler: async () =>
            await this.router.navigate(['/login'])},
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
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
