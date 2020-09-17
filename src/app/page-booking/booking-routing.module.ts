import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingDetailComponent } from './components/booking-detail/booking-detail.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { BookingResolver } from './guards/booking-resolver.guard';


const routes: Routes = [
  { path: '', component: BookingListComponent, resolve: [BookingResolver] },
  { path: 'new', component: NewBookingComponent },
  { path: ':id', component: BookingDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
