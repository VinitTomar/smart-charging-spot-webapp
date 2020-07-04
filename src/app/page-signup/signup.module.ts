import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { BaseSignupComponent } from './components/base-signup/base-signup.component';


@NgModule({
  declarations: [BaseSignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
