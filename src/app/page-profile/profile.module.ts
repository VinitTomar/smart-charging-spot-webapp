import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { BaseProfileComponent } from './components/base-profile/base-profile.component';
import { AfterLoggedInModule } from '../util/after-logged-in';


@NgModule({
  declarations: [BaseProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AfterLoggedInModule
  ]
})
export class ProfileModule { }
