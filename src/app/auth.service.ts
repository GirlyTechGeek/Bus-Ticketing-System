import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(public router: Router, public api: ApiService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if(localStorage.getItem('token')!= null){
      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
