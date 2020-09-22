import { AddressModel } from 'src/app/page-pci/model/address.model';
import { BookingModel } from './booking';

export interface BookingDetailModel extends BookingModel {
  pciName: string;
  pciHighway: string;
  pciAddress: AddressModel;
}