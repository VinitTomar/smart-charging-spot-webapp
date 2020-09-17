import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/confirmation/services/confirmation.service';
import { BookingStatus } from '../../extras/booking-status';
import { BookingModel } from '../../models/booking';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'scs-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingListComponent implements OnInit {

  readonly allBookingStatus = BookingStatus;

  get bookings$() {
    return this._bookingService.myBookings$;
  }

  constructor(
    private _bookingService: BookingService,
    private _confirmService: ConfirmationService<BookingModel>,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  detail(booking: BookingModel) {
    this._router.navigate(['/booking/', booking._id]);
  }

  cancel(booking: BookingModel) {
    const subsc = this._confirmService.askForConfirmation({
      action: this._bookingService.cancelBooking(booking),
      message: `Are you sure, You want to cancel your booking?`
    }).afterClosed().subscribe(res => {
      subsc.unsubscribe();
    })
  }

}
