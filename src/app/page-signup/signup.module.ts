import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule } from '@angular/material';

import { SignupRoutingModule } from './signup-routing.module';
import { BaseSignupComponent } from './components/base-signup/base-signup.component';
import { UserFormModule } from '../shared/user-form';


@NgModule({
  declarations: [BaseSignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatButtonModule,
    UserFormModule,
    MatCardModule
  ]
})
export class SignupModule { }
