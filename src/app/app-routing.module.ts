import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { GuardService } from './services/gaurd.service';
// import { UserService } from './services/user.service';
// import { GuestService } from './services/guest.service';
// import { PrevService } from './services/prev.service';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule) },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    // canActivate: [GuestService],
    // resolve: { user: PrevService },
  },
  { path: 'signup', loadChildren: () => import ( './pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'reset', loadChildren: './pages/reset/reset.module#ResetPageModule' },
  {
    path: 'u',
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule) },
      { path: 'booking', loadChildren: () => import('./pages/deposit/deposit.module').then(m => m.DepositPageModule) },
      { path: 'trips', loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule) },
      { path: 'notifications', loadChildren: () => import('./pages/loan/loan.module').then(m => m.LoanPageModule) },
      { path: 'track-trip', loadChildren: () => import('./pages/tell-a-friend/tell-a-friend.module').then(m => m.TellAFriendPageModule) },
      { path: 'trip-history', loadChildren: () => import('./pages/trips/trips-routing.module').then(m => m.TripsPageRoutingModule) },
      { path: 'valid-tickets',
        loadChildren: () => import('./pages/valid-tickets/valid-tickets-routing.module').then(m => m.ValidTicketsPageRoutingModule) },
      { path: 'edit-trip', loadChildren: () => import('./pages/edit-trip/edit-trip-routing.module').then(m => m.EditTripPageRoutingModule) },
      { path: 'admin-login', loadChildren: () => import('./pages/admin-login/admin-login-routing.module').then(m => m.AdminLoginPageRoutingModule) },
      { path: 'admin-dashboard', loadChildren: () => import('./pages/admin-dashboard/admin-dashboard-routing.module').then(m => m.AdminDashboardPageRoutingModule) },
      // { path: 'change-pin', loadChildren: () => import('./pages/change-pin/change-pin.module').then(m => m.ChangePinPageModule) },
      // { path: 'e-statement', loadChildren: () => import('./pages/e-statement/e-statement.module').then(m => m.EStatementPageModule) },
      { path: '', redirectTo: '/u/dashboard', pathMatch: 'full' }
    ],
    // canActivate: [GuardService],
    // resolve: { user: UserService },
  },
  {
    path: 'banner',
    loadChildren: () => import('./pages/banner/banner.module').then(m => m.BannerPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/deposit/deposit.module').then(m => m.DepositPageModule)
  },
  // {
  //   path: 'calculator',
  //   loadChildren: () => import('./pages/calculator/calculator.module').then(m => m.CalculatorPageModule)
  // },
  // {
  //   path: 'change-pin',
  //   loadChildren: () => import('./pages/change-pin/change-pin.module').then(m => m.ChangePinPageModule)
  // },
  // {
  //   path: 'contact',
  //   loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  // {
  //   path: 'e-statement',
  //   loadChildren: () => import('./pages/e-statement/e-statement.module').then(m => m.EStatementPageModule)
  // },
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
  // {
  //   path: 'messages',
  //   loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  // },
  // {
  //   path: 'redeem',
  //   loadChildren: () => import('./pages/redeem/redeem.module').then(m => m.RedeemPageModule)
  // },
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
    loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
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
