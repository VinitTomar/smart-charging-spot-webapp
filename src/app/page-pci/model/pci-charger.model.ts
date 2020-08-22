import { PciChargerOptionModel } from './pci-charger-option.model';

export interface PciChargerModel extends PciChargerOptionModel {
  points: number;
}