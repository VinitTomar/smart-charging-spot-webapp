import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent, HomeComponent } from './root';
import { ActivateWhenLoggedInGuard, DeActivateWhenLoggedInGuard } from './root/guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./page-login/login.module').then(m => m.LoginModule),
    canActivate: [DeActivateWhenLoggedInGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./page-signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./page-profile/profile.module').then(m => m.ProfileModule),
    canActivate: [ActivateWhenLoggedInGuard]
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
