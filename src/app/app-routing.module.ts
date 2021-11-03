import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GuardService} from './services/gaurd.service';
import {UserService} from './services/user.service';
import {GuestService} from './services/guest.service';
import {PrevService} from './services/prev.service';

const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full' },
    { path: 'splash', loadChildren:()=> import ('./pages/splash/splash.module').then(m => m.SplashPageModule) },
    {
        path: 'login',
        // loadChildren: './pages/signin/signin.module#SigninPageModule',
        loadChildren:()=> import ('./pages/login/login.module').then (m => m.LoginPageModule),
        canActivate: [GuestService],
        resolve: {user: PrevService},
    },
    { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule', canActivate: [GuestService] },
    { path: 'reset', loadChildren: './pages/reset/reset.module#ResetPageModule' },
    {
        path: 'u',
        children: [
           // { path: 'banner', loadChildren: './pages/banner/banner.module#BannerPageModule' },
            // { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
            { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule'},
            { path: 'deposit', loadChildren: './pages/deposit/deposit.module#DepositPageModule' },
            { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule' },
            { path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule' },
            { path: 'loan', loadChildren: './pages/loan/loan.module#LoanPageModule' },
            { path: 'redeem', loadChildren: './pages/redeem/redeem.module#RedeemPageModule' },
            { path: 'calculator', loadChildren: './pages/calculator/calculator.module#CalculatorPageModule' },
            { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
            { path: 'message', loadChildren: './pages/message/message.module#MessagePageModule' },
            { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesPageModule' },
            { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
            { path: 'change-pin', loadChildren: './pages/change-pin/change-pin.module#ChangePinPageModule' },
            { path: 'edit-goal', loadChildren: './pages/edit-goal/edit-goal.module#EditGoalPageModule' },
            { path: 'more', loadChildren: './pages/more/more.module#MorePageModule' },
            { path: 'e-statement', loadChildren: './pages/e-statement/e-statement.module#EStatementPageModule' },
            { path: '', redirectTo: '/u/dashboard', pathMatch: 'full' }
        ],
        canActivate: [GuardService],
        resolve: {user: UserService},
    },
  {
    path: 'banner',
    loadChildren: () => import('./pages/banner/banner.module').then( m => m.BannerPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./pages/calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'change-pin',
    loadChildren: () => import('./pages/change-pin/change-pin.module').then( m => m.ChangePinPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'e-statement',
    loadChildren: () => import('./pages/e-statement/e-statement.module').then( m => m.EStatementPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'loan',
    loadChildren: () => import('./pages/loan/loan.module').then( m => m.LoanPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'redeem',
    loadChildren: () => import('./pages/redeem/redeem.module').then( m => m.RedeemPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
