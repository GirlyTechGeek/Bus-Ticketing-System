import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-valid-tickets',
  templateUrl: './valid-tickets.page.html',
  styleUrls: ['./valid-tickets.page.scss'],
})
export class ValidTicketsPage implements OnInit {

  tripResults: any;
  dateChecker: any = new Date();
  private busy: any;
  public username: any;
  tripId: any;
  constructor(
    private dataService: ApiService,
    private loader: LoadingController,
    private ref: ChangeDetectorRef,
    private dataPipe: DatePipe,
    private router: Router,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('adminUser');
  }

  ionViewWillEnter = () => {
    this.freeze().then(async () => {
      this.dataService.getTrips(localStorage.getItem('user')).subscribe(async (res) => {
        this.tripResults = JSON.parse(JSON.stringify(res)) ;
        await this.loader.dismiss();
        console.log(this.tripResults);
        this.ref.detectChanges();
      });
    });
    this.dateChecker = this.dataPipe.transform(this.dateChecker, 'yyyy-MM-dd');
    console.log(this.dateChecker);
  };
  firstEdit(id: any, from: any, to: any, dep: any, ret: any, time: any){
    this.tripId = id
    sessionStorage.setItem('ID', id);
    sessionStorage.setItem('from', from);
    sessionStorage.setItem('to', to);
    sessionStorage.setItem('dep', dep);
    sessionStorage.setItem('ret', ret);
    sessionStorage.setItem('time', time);
    this.router.navigate(['/edit-trip']);
  }
  deleteRecord(ID: any){
    this.freeze().then(async () => {
      this.dataService.deleteTrip(
        ID
      ).subscribe(async (res) =>{
        await this.loader.dismiss();
          const pop1 = await this.alert.create({
            header: 'Confirmation',
            subHeader: 'Delete Record',
            message: 'This record will be permanently deleted',
            cssClass: 'sw-pop',
            backdropDismiss: false,
            mode: 'ios',
            buttons: [
              {text: 'Cancel', role: 'cancel'},
              {
                text: 'Confirm',
                role: 'confirm',
                handler: async (data) =>{
                  this.notify('Record deleted successfully');
                  this.ionViewWillEnter();
                }
              }
            ]
          });
          await pop1.present();

      },
      (err: any) => {
        console.log(err)
        this.loader.dismiss()
        this.notify(`Ooops. Unable to delete recorf. Please try again later.`);
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
