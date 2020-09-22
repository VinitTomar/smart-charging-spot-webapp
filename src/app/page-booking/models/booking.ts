import { PciChargerModel } from 'src/app/page-pci/model/pci-charger.model';
import { BookingStatus } from '../extras/booking-status';

export interface BookingModel {
  _id?: string;
  pciId: string;
  charger: PciChargerModel;
  pointerIndex: number;
  status?: BookingStatus;
  start: Date;
  end: Date;
  duration: number
}