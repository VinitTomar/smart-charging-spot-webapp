import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatRadioModule, MatIconModule, MatDividerModule, MatSelectModule, MatListModule, MatExpansionModule } from '@angular/material';

import { PciRoutingModule } from './pci-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfterLoggedInModule } from '../util/after-logged-in';
import { BasePciComponent } from './components/base-pci/base-pci.component';
import { RegisterPciComponent } from './components/register-pci/register-pci.component';


@NgModule({
  declarations: [
    BasePciComponent,
    RegisterPciComponent
  ],
  imports: [
    CommonModule,
    AfterLoggedInModule,
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
