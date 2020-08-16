import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatRadioModule, MatIconModule, MatDividerModule, MatSelectModule, MatListModule } from '@angular/material';

import { RegisterPciRoutingModule } from './register-pci-routing.module';
import { BaseRegisterPciComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BaseRegisterPciComponent],
  imports: [
    CommonModule,
    RegisterPciRoutingModule,
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
    MatListModule
  ]
})
export class RegisterPciModule { }
