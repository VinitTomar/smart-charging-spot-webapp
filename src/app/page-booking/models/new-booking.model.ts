import { AbstractControl } from '@angular/forms';
import { BookingSlotModel } from './booking-slot.model';

export interface NewBookingModel {
  selectedDateFormControl: AbstractControl;
  durationFormControl: AbstractControl;
  selectedSlotFormControl: AbstractControl;
  slots: BookingSlotModel[];
  bookingInProgress?: boolean
}