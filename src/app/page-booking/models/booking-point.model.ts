import { BookingSlotModel } from './booking-slot.model';

export interface BookingPointModel {
  label: string;
  bookedSlots: BookingSlotModel[]
}