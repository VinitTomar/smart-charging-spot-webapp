import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ConfirmationService } from 'src/app/shared/confirmation/services/confirmation.service';
import { BookingStatus } from '../../extras/booking-status';
import { BookingModel } from '../../models/booking';
import { BookingDetailModel } from '../../models/booking-detail.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'scs-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingDetailComponent implements OnInit {

  readonly allBookingStatus = BookingStatus;

  private get _bookingId() {
    return this._activeRoute.snapshot.paramMap.get('id');
  }

  get bookingDetail$() {
    if (this._detail) {
      return of(this._detail);
    }

    return this._bookingService.bookingDetail(this._bookingId).pipe(
      tap(detail => {
        if (!detail) {
          this._router.navigateByUrl('404', { skipLocationChange: true });
        }

        this._detail = detail;
      }),
      filter(detail => !!detail)
    );
  }

  private _detail: BookingDetailModel

  constructor(
    private _bookingService: BookingService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _confirmService: ConfirmationService<BookingModel>,
  ) { }

  ngOnInit() {
  }

  cancelBooking(booking: BookingDetailModel) {
    const subsc = this._confirmService.askForConfirmation({
      action: this._bookingService.cancelBooking(booking),
      message: `Are you sure, You want to cancel your booking?`
    }).afterClosed().subscribe(() => {
      subsc.unsubscribe();
    })
  }

}
