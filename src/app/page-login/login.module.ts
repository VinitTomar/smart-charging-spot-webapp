import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { BaseLoginComponent } from './components/base-login/base-login.component';


@NgModule({
  declarations: [BaseLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class LoginModule { }
