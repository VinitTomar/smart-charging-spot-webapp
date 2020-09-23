import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { PciModel } from 'src/app/page-pci/model/pci.model';
import { BookingStatus } from '../extras/booking-status';
import { BookingModel } from '../models/booking';
import { BookingChargerModel } from '../models/booking-charger.model';
import { BookingDetailModel } from '../models/booking-detail.model';
import { BookingPointModel } from '../models/booking-point.model';
import { BookingSlotModel } from '../models/booking-slot.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _searchedChargerSubject = new BehaviorSubject<BookingChargerModel[]>([]);
  get searchedChargers$() {
    return this._searchedChargerSubject.asObservable();
  }
  private set _searchedChargers(list: BookingChargerModel[]) {
    this._searchedChargerSubject.next(list);
  }
  private get _searchedChargers() {
    return this._searchedChargerSubject.value;
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
      .pipe(
        switchMap((pcis: PciModel[]) => {
          return forkJoin(pcis.map(pci => this._bookedCharger(pci)))
        }),
        map(arrs => {
          return arrs.reduce((prev, curr) => {
            return [...prev, ...curr]
          });
        })
      )
      .toPromise().then((list) => this._searchedChargers = list);
  }

  emptySearchResult() {
    this._searchedChargers = [];
  }

  private _myBooking() {
    this._httpClient.get<BookingModel[]>('booking')
      .toPromise().then(bookings => this._myBookings = bookings);
  }

  private _bookedCharger(pci: PciModel): Observable<BookingChargerModel[]> {
    return this._httpClient.get<BookingModel[]>(`pci/${pci._id}/booking`)
      .pipe(
        map((bookings: BookingModel[]) => {
          const bkngChrgs = pci.chargers.map(chrg => {

            const bookedSlotsOfCharger = bookings
              .filter(bkng => bkng.status === BookingStatus.SUCCESSFULL)
              .filter(bkng => {
                return bkng.charger.type === chrg.type && bkng.charger.points === chrg.points
              })
              .map(bkng => {
                const bkdSlog: BookingSlotModel = {
                  start: new Date(bkng.start),
                  end: new Date(bkng.end),
                  duration: bkng.duration,
                  point: bkng.pointerIndex
                };
                return bkdSlog;
              });

            const points: BookingPointModel[] = [];

            for (let i = 0; i < chrg.points; i++) {
              const point: BookingPointModel = {
                label: `Point ${i + 1}`,
                bookedSlots: bookedSlotsOfCharger.filter(slt => slt.point === i + 1)
              }

              points.push(point);
            }

            const bkChrg: BookingChargerModel = {
              ...chrg,
              pciName: pci.name,
              pciAddress: pci.address,
              pciId: pci._id,
              bookingPoints: points
            };

            return bkChrg;
          });

          return bkngChrgs;
        })
      );
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
