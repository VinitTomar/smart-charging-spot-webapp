import { Pipe, PipeTransform } from '@angular/core';
import { PciChargerOptionModel } from 'src/app/page-pci/model/pci-charger-option.model';

@Pipe({
  name: 'pciChargerToText'
})
export class PciChargerToTextPipe implements PipeTransform {

  transform(chr: PciChargerOptionModel, ...args: any[]): any {
    return `${chr.type} / ${chr.connector} / voltage: ${chr.voltageRange}`;
  }

}
