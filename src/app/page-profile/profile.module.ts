import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatListModule, MatIconModule } from '@angular/material';

import { ProfileRoutingModule } from './profile-routing.module';
import { BaseProfileComponent } from './components/base-profile/base-profile.component';
import { AfterLoggedInModule } from '../util/after-logged-in';
import { UserFormModule } from '../shared/user-form';


@NgModule({
  declarations: [BaseProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AfterLoggedInModule,
    MatCardModule,
    UserFormModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ]
})
export class ProfileModule { }
