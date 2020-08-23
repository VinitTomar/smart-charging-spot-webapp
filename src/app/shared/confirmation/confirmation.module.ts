import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfirmationService } from './services/confirmation.service';



@NgModule({
  declarations: [
    ConfirmationDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    ConfirmationService
  ],
  entryComponents: [
    ConfirmationDialog
  ]
})
export class ConfirmationModule { }
