import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  oneway = false
  constructor() { }

  ngOnInit() {
  }
  bookOneway(){
    this.oneway = !this.oneway
  }
}
