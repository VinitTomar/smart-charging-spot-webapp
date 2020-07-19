import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { UserFormComponent } from './user-form.component';
import { AvailibiltyCheckerValidator } from './validators/availability-checker';



@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    AvailibiltyCheckerValidator
  ],
  exports: [UserFormComponent]
})
export class UserFormModule { }
