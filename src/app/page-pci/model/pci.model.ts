import { GpsCoordinateModel } from './gps-coordinate.model';
import { AddressModel } from './address.model';
import { PciChargerModel } from './pci-charger.model';

export interface PciModel {
  _id?: string;
  name: string;
  highWay: string;
  gpsCoord: GpsCoordinateModel;
  address: AddressModel;
  chargers: PciChargerModel[];
}