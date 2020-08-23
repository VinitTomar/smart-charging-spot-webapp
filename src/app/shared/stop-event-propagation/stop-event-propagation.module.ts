import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopClickEventPropagationDirective } from './directives/stop-click-event-propagation.directive';



@NgModule({
  declarations: [StopClickEventPropagationDirective],
  imports: [
    CommonModule
  ],
  exports: [
    StopClickEventPropagationDirective
  ]
})
export class StopEventPropagationModule { }
