import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

import { SignupRoutingModule } from './signup-routing.module';
import { BaseSignupComponent } from './components/base-signup/base-signup.component';


@NgModule({
  declarations: [BaseSignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class SignupModule { }
