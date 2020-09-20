import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BookingChargerModel } from '../../models/booking-charger.model';
import { BookingPointModel } from '../../models/booking-point.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'scs-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBookingComponent implements OnInit {

  searchInProgress = false;

  get bookingChargers$() {
    return this._bookingService.searchedChargers$.pipe(tap(() => this.searchInProgress = false));
  }

  constructor(
    private _bookingService: BookingService,
  ) { }

  ngOnInit() {
  }

  search(keyword: string) {
    this.searchInProgress = true;
    this._bookingService.searchPci(keyword);
  }

}
