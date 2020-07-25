import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseRegisterPciComponent } from './components';


const routes: Routes = [
  { path: '', component: BaseRegisterPciComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterPciRoutingModule { }
