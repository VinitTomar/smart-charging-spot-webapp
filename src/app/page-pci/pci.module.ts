import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatRadioModule, MatIconModule, MatDividerModule, MatSelectModule, MatListModule, MatExpansionModule } from '@angular/material';

import { PciRoutingModule } from './pci-routing.module';
import { AfterLoggedInModule } from '../util/after-logged-in';
import { BasePciComponent } from './components/base-pci/base-pci.component';
import { AddEditPciComponent } from './components/add-edit-pci/add-edit-pci.component';
import { PciDetailComponent } from './components/pci-detail/pci-detail.component';
import { PciChargerToTextPipe } from './pipes/pci-charger-to-text.pipe';
import { ConfirmationModule } from '../shared/confirmation/confirmation.module';
import { StopEventPropagationModule } from '../shared/stop-event-propagation/stop-event-propagation.module';


@NgModule({
  declarations: [
    BasePciComponent,
    AddEditPciComponent,
    PciDetailComponent,
    PciChargerToTextPipe
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
    MatExpansionModule
  ]
})
export class PciModule { }
