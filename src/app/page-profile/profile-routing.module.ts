import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseProfileComponent } from './components/base-profile/base-profile.component';
import { ResolveIfLoggedInGuard } from '../util/after-logged-in';


const routes: Routes = [
  { path: '', component: BaseProfileComponent, resolve: [ResolveIfLoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
