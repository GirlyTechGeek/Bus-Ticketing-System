import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {} from 'googlemaps';

let map: google.maps.Map;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {
  user: any;
  constructor(
    private menu: MenuController,
    ) { }


  //  initMap(): void {
  //   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }
  ngOnInit() {
    this.user = localStorage.getItem('user');
  }



}
