import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTabsModule, MatRadioModule } from '@angular/material';

import { RegisterPciRoutingModule } from './register-pci-routing.module';
import { BaseRegisterPciComponent } from './components';


@NgModule({
  declarations: [BaseRegisterPciComponent],
  imports: [
    CommonModule,
    RegisterPciRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class RegisterPciModule { }
