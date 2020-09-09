import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'scs-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBookingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
