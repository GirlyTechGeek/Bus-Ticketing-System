import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {DatePipe, LocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-view-buses',
  templateUrl: './view-buses.page.html',
  styleUrls: ['./view-buses.page.scss'],
})
export class ViewBusesPage implements OnInit {
  tripResults: any;
  private busy: any;

  constructor(
    private dataService: ApiService,
    private loader: LoadingController,
    private ref: ChangeDetectorRef,
    private dataPipe: DatePipe,
    private router: Router,
    private alert: AlertController,
    private location: LocationStrategy
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter = () => {
    this.freeze().then(async () => {
      this.dataService.getBuses().subscribe(async (res) => {
        this.tripResults = JSON.parse(JSON.stringify(res));
        await this.loader.dismiss();
        console.log(this.tripResults);
      });
    });
  };
  back(){
    this.location.back();
  }
  exportExcel() {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'travellers.xlsx');

  }
  deleteRecord(ID: any){
    this.freeze().then(async () => {
      this.dataService.deleteBus(
        ID
      ).subscribe(async (res) =>{
          await this.loader.dismiss();
          this.notify('Record deleted successfully');
          this.ionViewWillEnter();
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
