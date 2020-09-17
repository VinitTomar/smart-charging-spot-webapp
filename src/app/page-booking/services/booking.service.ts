import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { PciModel } from 'src/app/page-pci/model/pci.model';
import { BookingStatus } from '../extras/booking-status';
import { BookingModel } from '../models/booking';
import { BookingDetailModel } from '../models/booking-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _searchedPciSubject = new BehaviorSubject<PciModel[]>([]);
  get searchedPcis$() {
    return this._searchedPciSubject.asObservable();
  }
  private set _searchedPcis(list: PciModel[]) {
    this._searchedPciSubject.next(list);
  }
  private get _searchedPcis() {
    return this._searchedPciSubject.value;
  }

  private _myBookingsSubject = new BehaviorSubject<BookingModel[]>(null);
  readonly myBookings$ = this._myBookingsSubject.asObservable().pipe(
    tap(list => {
      if (!list) {
        this._myBooking();
      }
    }),
    filter(list => !!list)
  );

  private set _myBookings(booking: BookingModel[]) {
    this._myBookingsSubject.next(booking);
  }
  private get _myBookings() {
    return this._myBookingsSubject.value;
  }

  constructor(
    private _httpClient: HttpClient
  ) { }

  searchPci(keyword: string) {
    const params = new HttpParams({
      fromObject: { search: keyword }
    })

    this._httpClient.get<PciModel[]>('pci', { params })
      .toPromise().then(list => this._searchedPcis = list);
  }

  private _myBooking() {
    this._httpClient.get<BookingModel[]>('booking')
      .toPromise().then(bookings => this._myBookings = bookings);
  }

  newBooking(booking: BookingModel) {
    return this._httpClient.post<BookingModel>('booking', booking)
      .pipe(
        tap(booking => {
          this._myBookings = [booking, ...this._myBookings];
        })
      );
  }

  bookingDetail(id: string): Observable<BookingDetailModel> {
    return this.myBookings$.pipe(
      switchMap(res => {
        const booking = res.find(bk => bk._id === id);

        if (!booking)
          return of(null);

        return this._httpClient.get<PciModel>('pci/' + booking.pciId)
          .pipe(
            map(res => {
              if (!res)
                return null;

              const bookingDetil: BookingDetailModel = {
                ...booking,
                pciId: res._id,
                pciAddress: res.address,
                pciHighway: res.highWay,
                pciName: res.name
              };
              return bookingDetil;
            })
          );
      })
    );
  }

  cancelBooking(booking: BookingModel) {
    return this._httpClient.post<BookingModel>(`booking/${booking._id}/cancel`, {})
      .pipe(
        tap(booking => {
          const findBooking = this._myBookings.find(bk => bk._id === booking._id);
          findBooking.status = BookingStatus.CANCELED;
        })
      );
  }

}
