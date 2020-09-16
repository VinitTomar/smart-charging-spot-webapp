import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { MatCardModule, MatListModule, MatDividerModule, MatIconModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BookingListComponent, NewBookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BookingModule { }
