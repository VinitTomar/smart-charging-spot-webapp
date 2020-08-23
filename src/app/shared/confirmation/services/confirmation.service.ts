import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationModel } from '../models/confirmation.model';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class ConfirmationService<T> {

  constructor(
    private _dialog: MatDialog
  ) { }

  askForConfirmation(data: ConfirmationModel<T>) {
    return this._dialog.open(ConfirmationDialog, {
      data,
      disableClose: true,
      restoreFocus: false,
      autoFocus: false
    });
  }

}
