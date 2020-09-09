import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { MatCardModule, MatListModule, MatDividerModule, MatIconModule, MatButtonModule } from '@angular/material';
import { NewBookingComponent } from './components/new-booking/new-booking.component';


@NgModule({
  declarations: [BookingListComponent, NewBookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class BookingModule { }
