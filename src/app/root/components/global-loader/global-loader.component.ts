import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GlobalLoaderService } from '../../services';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'scs-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss'],
  host: {
    'class': 'scs-global-loader',
    '[class.show]': 'show'
  }
})
export class GlobalLoaderComponent implements OnInit, OnDestroy {

  show = false;

  private _allRxjsSubscription: Subscription[] = [];

  constructor(
    private _loader: GlobalLoaderService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._allRxjsSubscription.push(
      this._loader.loaderVisibility$
        .pipe(
          tap(() => {
            if (this._cdRef)
              this._cdRef.markForCheck();
          })
        ).subscribe(state => this.show = state)
    );
  }

  ngOnDestroy() {
    this._allRxjsSubscription.forEach(subsc => subsc.unsubscribe());
  }

}
