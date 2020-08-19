import { Component, OnInit } from '@angular/core';
import { PciCharger } from '../../model/pci-charger';
import { AddedCharger } from '../../model/added-charger';

@Component({
  selector: 'scs-register-pci',
  templateUrl: './register-pci.component.html',
  styleUrls: ['./register-pci.component.scss']
})
export class RegisterPciComponent implements OnInit {

  selectedCharger: PciCharger;

  avlChargers: PciCharger[] = [
    { type: 'Fast', connector: 'CCS (min 50 kW)', voltageRange: '200 - 1000' },
    { type: 'Fast', connector: 'CHAdeMO (min 50 kW)', voltageRange: '200 - 1000' },
    { type: 'Moderate', connector: 'Type-2 AC (min 22 kW)', voltageRange: '380 - 480' },
    { type: 'Moderate', connector: 'Bharat DC-001 (15 kW)', voltageRange: '72 - 200' },
    { type: 'Moderate', connector: 'Bharat AC-001 (10 kW)', voltageRange: '230' },
  ];

  addedChargers: AddedCharger[] = [];

  step = 1;


  constructor() { }

  ngOnInit() {
    this.selectedCharger = this.avlChargers[0];
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  formatChargerName(chr: PciCharger): string {
    return `${chr.type} / ${chr.connector} / voltage: ${chr.voltageRange}`;
  }

  addCharger() {
    this.addedChargers.push({ charger: this.selectedCharger, quantity: 1 });
  }

  incChargerQuantity(index: number) {
    this.addedChargers[index].quantity++;
  }

  decChargerQuantity(index: number) {
    if (this.addedChargers[index].quantity == 1) {
      this.addedChargers.splice(index, 1);
    } else {
      this.addedChargers[index].quantity--;
    }
  }

}
