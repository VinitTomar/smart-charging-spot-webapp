import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'scs-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
