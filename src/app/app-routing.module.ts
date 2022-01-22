import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthService} from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule) },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  { path: 'signup', loadChildren: () => import ( './pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'reset', loadChildren: './pages/reset/reset.module#ResetPageModule' },
  {
    path: 'banner',
    loadChildren: () => import('./pages/banner/banner.module').then(m => m.BannerPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/deposit/deposit.module').then(m => m.DepositPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule), canActivate: [AuthService]
  },

  {
    path: 'trips',
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule)
  },
  { path: 'trip-history',
    loadChildren: () => import('./pages/trips/trips-routing.module').then(m => m.TripsPageRoutingModule) },
  { path: 'valid-tickets',
    loadChildren: () => import('./pages/valid-tickets/valid-tickets-routing.module').then(m => m.ValidTicketsPageRoutingModule) },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/loan/loan.module').then(m => m.LoanPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'track-trip',
    loadChildren: () => import('./pages/tell-a-friend/tell-a-friend.module').then(m => m.TellAFriendPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('./pages/trips/trips.module').then( m => m.TripsPageModule)
  },
  {
    path: 'valid-tickets',
    loadChildren: () => import('./pages/valid-tickets/valid-tickets.module').then( m => m.ValidTicketsPageModule)
  },
  {
    path: 'edit-trip',
    loadChildren: () => import('./pages/edit-trip/edit-trip.module').then( m => m.EditTripPageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./pages/admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule), canActivate: [AuthService]
  },

  {
    path: 'view-user',
    loadChildren: () => import('./pages/view-user/view-user.module').then( m => m.ViewUserPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'add-bus',
    loadChildren: () => import('./pages/add-bus/add-bus.module').then( m => m.AddBusPageModule)
  },
  {
    path: 'view-buses',
    loadChildren: () => import('./pages/view-buses/view-buses.module').then( m => m.ViewBusesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
