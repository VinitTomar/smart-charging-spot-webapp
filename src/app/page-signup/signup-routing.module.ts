import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseSignupComponent } from './components/base-signup/base-signup.component';


const routes: Routes = [
  { path: '', component: BaseSignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
