import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatRadioModule, MatIconModule, MatDividerModule, MatSelectModule, MatListModule, MatExpansionModule } from '@angular/material';

import { PciRoutingModule } from './pci-routing.module';
import { AfterLoggedInModule } from '../util/after-logged-in';
import { BasePciComponent } from './components/base-pci/base-pci.component';
import { AddEditPciComponent } from './components/add-edit-pci/add-edit-pci.component';
import { PciDetailComponent } from './components/pci-detail/pci-detail.component';
import { ConfirmationModule } from '../shared/confirmation/confirmation.module';
import { StopEventPropagationModule } from '../shared/stop-event-propagation/stop-event-propagation.module';
import { PciChargerToTextModule } from '../shared/pci-charger-to-text/pci-charger-to-text.module';


@NgModule({
  declarations: [
    BasePciComponent,
    AddEditPciComponent,
    PciDetailComponent
  ],
  imports: [
    CommonModule,
    ConfirmationModule,
    AfterLoggedInModule,
    StopEventPropagationModule,
    PciRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    PciChargerToTextModule
  ]
})
export class PciModule { }
