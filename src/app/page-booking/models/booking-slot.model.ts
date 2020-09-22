export interface BookingSlotModel {
  start: Date;
  end: Date;
  duration: number;
  point: number;
  isAvailable?: boolean;
}