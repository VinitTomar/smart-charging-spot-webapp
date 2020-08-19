import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResolveIfLoggedInGuard } from '../util/after-logged-in';
import { BasePciComponent } from './components/base-pci/base-pci.component';
import { RegisterPciComponent } from './components/register-pci/register-pci.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BasePciComponent, },
      { path: 'add', component: RegisterPciComponent }
    ],
    resolve: [ResolveIfLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PciRoutingModule { }
