import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatChipSelectionChange, MatSnackBar } from '@angular/material';
import { addHours, format, isAfter, isBefore, isSameDay, isSameHour, parse } from 'date-fns';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookingStatus } from '../../extras/booking-status';
import { BookingModel } from '../../models/booking';
import { BookingChargerModel } from '../../models/booking-charger.model';
import { BookingPointModel } from '../../models/booking-point.model';
import { BookingSlotModel } from '../../models/booking-slot.model';
import { NewBookingModel } from '../../models/new-booking.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'scs-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBookingComponent implements OnInit, OnDestroy {

  searchInProgress = false;
  private _newBookingsMap: WeakMap<BookingChargerModel, NewBookingModel[]>;
  private readonly _allRxjsSubscriptions: Subscription[] = [];

  get bookingChargers$() {
    return this._bookingService.searchedChargers$
      .pipe(
        tap(chargers => {
          chargers.forEach(chrg => {
            if (this._newBookingsMap.get(chrg))
              return;

            const newBookings: NewBookingModel[] = chrg.bookingPoints.map((point, index) => {
              const nwBkng: NewBookingModel = {
                selectedDateFormControl: new FormControl(new Date()),
                durationFormControl: new FormControl("1"),
                selectedSlotFormControl: new FormControl(),
                slots: this._calculateSlotAvailability(point, new Date(), "1", index)
              };

              return nwBkng;
            });

            this._newBookingsMap.set(chrg, newBookings);
          });

        }),
        tap(() => this.searchInProgress = false)
      );
  }

  constructor(
    private _bookingService: BookingService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._newBookingsMap = new WeakMap();
    this._bookingService.emptySearchResult();
  }

  ngOnDestroy() {
    this._allRxjsSubscriptions.forEach(subsc => subsc.unsubscribe());
  }

  search(keyword: string) {
    this.searchInProgress = true;
    this._bookingService.searchPci(keyword);
  }

  makeNewBooking(chrg: BookingChargerModel, index: number) {
    if (!this.getSelectedSlotFc(chrg, index).value) {
      this._snackBar.open('Please select a time slot for booking', "X");
      return;
    }

    this.setBookingProgressStatus(true, chrg, index);

    const myNewBooking: BookingModel = {
      charger: {
        connector: chrg.connector,
        points: chrg.points,
        type: chrg.type,
        voltageRange: chrg.voltageRange
      },
      duration: 60 * +this.getDurationFc(chrg, index).value,
      pciId: chrg.pciId,
      pointerIndex: 1 + +index,
      start: this.getSelectedSlotFc(chrg, index).value.start,
      end: this.getSelectedSlotFc(chrg, index).value.end
    };

    const subsc = this._bookingService.newBooking(myNewBooking).subscribe(res => {
      console.log({ res })
      if (res.status === BookingStatus.SUCCESSFULL)
        this._snackBar.open("Booking Confirmed.", "X");
      else
        this._snackBar.open("Booking in progress, we will let you know after confirmation.", "X");
      this.setBookingProgressStatus(false, chrg, index);
    }, err => {
      console.log({ err })
      this._snackBar.open("Something went wrong. Please try after sometime", "X");
      this.setBookingProgressStatus(false, chrg, index);
    });
    this._allRxjsSubscriptions.push(subsc);
  }

  getBookingProgressStatus(chrg: BookingChargerModel, index: number) {
    return this._newBookingsMap.get(chrg)[index].bookingInProgress;
  }

  setBookingProgressStatus(value: boolean, chrg: BookingChargerModel, index: number) {
    this._newBookingsMap.get(chrg)[index].bookingInProgress = value;
  }

  getSelectedDateFc(chrg: BookingChargerModel, index: number): AbstractControl {
    const fc = this._newBookingsMap.get(chrg)[index].selectedDateFormControl;
    const subsc = fc.valueChanges.subscribe((date: Date) => {
      this._updateNewBookingSlots(chrg, index);
    });
    this._allRxjsSubscriptions.push(subsc);
    return fc;
  }

  getDurationFc(chrg: BookingChargerModel, index: number): AbstractControl {
    const fc = this._newBookingsMap.get(chrg)[index].durationFormControl;
    const subsc = fc.valueChanges.subscribe((duration: string) => {
      this._updateNewBookingSlots(chrg, index);
    });
    this._allRxjsSubscriptions.push(subsc);
    return fc;
  }

  getSelectedSlotFc(chrg: BookingChargerModel, index: number): AbstractControl {
    return this._newBookingsMap.get(chrg)[index].selectedSlotFormControl;
  }

  getBookingSlots(chrg: BookingChargerModel, index: number): BookingSlotModel[] {
    return this._newBookingsMap.get(chrg)[index].slots;
  }

  selectSlot(slot: BookingSlotModel, chrg: BookingChargerModel, index: number) {
    this.getSelectedSlotFc(chrg, index).setValue(slot);
  }

  private _updateNewBookingSlots(chrg: BookingChargerModel, index: number) {
    const bking = this._newBookingsMap.get(chrg)[index];
    bking.slots = this._calculateSlotAvailability(
      chrg.bookingPoints[index],
      bking.selectedDateFormControl.value,
      bking.durationFormControl.value,
      index
    );
  }

  private _calculateSlotAvailability(bookingPoint: BookingPointModel, selectedDate: Date, duration: string, pointIndex: number): BookingSlotModel[] {
    const dur: number = +duration;
    const booked = bookingPoint.bookedSlots;
    const allSlots: BookingSlotModel[] = [];
    let start = parse(format(selectedDate, 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date());
    let end = addHours(start, dur);

    while (isSameDay(start, selectedDate)) {
      allSlots.push({
        start,
        end,
        duration: dur,
        isAvailable: this._isDateAvailable(start, end, booked),
        point: pointIndex
      });
      start = end;
      end = addHours(end, dur);
    }

    return allSlots;
  }

  private _isDateAvailable(start: Date, end: Date, bookedSlot: BookingSlotModel[]): boolean {
    if (isBefore(start, new Date())) {
      return false;
    }

    return bookedSlot.reduce((prev, curr) => {
      let isAvailable = true;

      if ((isSameHour(start, curr.start) || isAfter(start, curr.start)) && (isSameHour(end, curr.end) || isBefore(end, curr.end)))
        isAvailable = false;

      if ((isSameHour(start, curr.start) || isAfter(curr.start, start)) && (isSameHour(end, curr.end) || isBefore(curr.end, end)))
        isAvailable = false;

      if (isAfter(start, curr.start) && isBefore(start, curr.end))
        isAvailable = false;

      if (isAfter(end, curr.start) && isBefore(end, curr.end))
        isAvailable = false;

      if (isAfter(curr.start, start) && isBefore(curr.start, end))
        isAvailable = false;

      if (isAfter(curr.end, start) && isBefore(curr.end, end))
        isAvailable = false;

      return prev && isAvailable;
    }, true);
  }

}
