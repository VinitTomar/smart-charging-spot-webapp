import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResolveIfLoggedInGuard } from '../util/after-logged-in';
import { BasePciComponent } from './components/base-pci/base-pci.component';
import { AddEditPciComponent } from './components/add-edit-pci/add-edit-pci.component';
import { PciListResolverGuard } from './guards/pci-list-resolver.guard';
import { PciDetailComponent } from './components/pci-detail/pci-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BasePciComponent, },
      { path: 'add', component: AddEditPciComponent },
      { path: ':id', component: PciDetailComponent },
      { path: ':id/edit', component: AddEditPciComponent }
    ],
    resolve: [
      ResolveIfLoggedInGuard,
      PciListResolverGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PciRoutingModule { }
