import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';


const routes: Routes = [
  { path: '', component: BookingListComponent },
  { path: 'new', component: NewBookingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
