import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { BookingModel } from '../models/booking';
import { BookingService } from '../services/booking.service';

@Injectable({
  providedIn: 'root'
})
export class BookingResolver implements Resolve<BookingModel[]> {

  constructor(
    private _bookingService: BookingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookingModel[]> {
    return this._bookingService.myBookings$.pipe(first());
  }
}
