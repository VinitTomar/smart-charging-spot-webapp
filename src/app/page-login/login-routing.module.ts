import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLoginComponent } from './components/base-login/base-login.component';

const routes: Routes = [{ path: '', component: BaseLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
