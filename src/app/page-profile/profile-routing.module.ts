import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseProfileComponent } from './components/base-profile/base-profile.component';


const routes: Routes = [
  { path: '', component: BaseProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
