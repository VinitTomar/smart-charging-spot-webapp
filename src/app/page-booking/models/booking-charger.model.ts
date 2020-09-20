import { AddressModel } from 'src/app/page-pci/model/address.model';
import { PciChargerModel } from 'src/app/page-pci/model/pci-charger.model';
import { BookingPointModel } from './booking-point.model';
import { ChargerBookedSlotModel } from './charger-booked-slot.model';

export interface BookingChargerModel extends PciChargerModel {
  pciName: String;
  pciAddress: AddressModel;
  pciId: string;
  bookingPoints: BookingPointModel[]
}