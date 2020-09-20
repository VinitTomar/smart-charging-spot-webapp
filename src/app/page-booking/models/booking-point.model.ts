import { ChargerBookedSlotModel } from './charger-booked-slot.model';

export interface BookingPointModel {
  label: string;
  bookedSlots: ChargerBookedSlotModel[]
}