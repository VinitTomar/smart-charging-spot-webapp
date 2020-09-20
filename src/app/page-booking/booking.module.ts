import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { MatCardModule, MatListModule, MatDividerModule, MatIconModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule, MatChipsModule } from '@angular/material';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationModule } from '../shared/confirmation/confirmation.module';
import { BookingDetailComponent } from './components/booking-detail/booking-detail.component';
import { PciChargerToTextModule } from '../shared/pci-charger-to-text/pci-charger-to-text.module';


@NgModule({
  declarations: [BookingListComponent, NewBookingComponent, BookingDetailComponent],
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
    MatInputModule,
    ConfirmationModule,
    PciChargerToTextModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatChipsModule
  ]
})
export class BookingModule { }
