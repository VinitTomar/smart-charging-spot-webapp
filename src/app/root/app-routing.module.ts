import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent, HomeComponent } from './components';
import { ActivateWhenLoggedInGuard, DeActivateWhenLoggedInGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('../page-login/login.module').then(m => m.LoginModule),
    canActivate: [DeActivateWhenLoggedInGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('../page-signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../page-profile/profile.module').then(m => m.ProfileModule),
    canActivate: [ActivateWhenLoggedInGuard],
    canLoad: [ActivateWhenLoggedInGuard]
  },
  {
    path: 'pci',
    loadChildren: () => import('../page-pci/pci.module').then(m => m.PciModule),
    canActivate: [ActivateWhenLoggedInGuard],
    canLoad: [ActivateWhenLoggedInGuard]
  },
  {
    path: 'booking',
    loadChildren: () => import('../page-booking/booking.module').then(m => m.BookingModule),
    canActivate: [ActivateWhenLoggedInGuard],
    canLoad: [ActivateWhenLoggedInGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
