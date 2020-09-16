import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PciModel } from 'src/app/page-pci/model/pci.model';

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

}
