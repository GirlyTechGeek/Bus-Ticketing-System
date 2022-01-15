import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tell-a-friend',
  templateUrl: './tell-a-friend.page.html',
  styleUrls: ['./tell-a-friend.page.scss'],
})
export class TellAFriendPage implements AfterViewInit {
  @ViewChild('map') mapElement;
  map: any;
  constructor() { }

  ngAfterViewInit() {
    this.initMap();
  }
  initMap(){
    const coords = new google.maps.LatLng(5.6037,0.1870);
    const mapOptions: google.maps.MapOptions ={
      center: coords,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
