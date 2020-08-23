import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationModel } from '../models/confirmation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scs-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialog<T> implements OnInit, OnDestroy {
  private readonly _allRxjsSubscription: Subscription[] = [];
  actionInProgress = false;

  get msg() {
    return this._data.message;
  }

  constructor(
    private _dialog: MatDialogRef<ConfirmationDialog<T>>,
    @Inject(MAT_DIALOG_DATA) private _data: ConfirmationModel<T>
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._allRxjsSubscription.forEach(sub => sub.unsubscribe());
  }

  performAction() {
    this.actionInProgress = true;

    if (this._data.action) {
      const subsc = this._data.action.subscribe(res => {
        this._dialog.close(res);
      }, err => {
        this.actionInProgress = false;
      });
      this._allRxjsSubscription.push(subsc);
    } else {
      this._dialog.close(true);
    }
  }

}
