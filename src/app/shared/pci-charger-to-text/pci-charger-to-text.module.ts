import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PciChargerToTextPipe } from './pipes/pci-charger-to-text.pipe';



@NgModule({
  declarations: [
    PciChargerToTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PciChargerToTextPipe
  ]
})
export class PciChargerToTextModule { }
