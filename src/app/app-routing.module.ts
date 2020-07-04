import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./page-login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./page-signup/signup.module').then(m => m.SignupModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
