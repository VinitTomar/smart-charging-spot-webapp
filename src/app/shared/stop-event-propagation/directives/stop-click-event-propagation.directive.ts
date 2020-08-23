import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[scsStopClickEvent]'
})
export class StopClickEventPropagationDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  stopClickEvent($event: UIEvent) {
    $event.stopPropagation();
  }

}
