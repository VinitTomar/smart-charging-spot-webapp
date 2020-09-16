import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'scs-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBookingComponent implements OnInit {

  searchInProgress = false;

  get pcisList$() {
    return this._bookingService.searchedPcis$.pipe(tap(() => this.searchInProgress = false));
  }

  constructor(
    private _bookingService: BookingService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  search(keyword: string) {
    this.searchInProgress = true;
    this._bookingService.searchPci(keyword);
  }

}
