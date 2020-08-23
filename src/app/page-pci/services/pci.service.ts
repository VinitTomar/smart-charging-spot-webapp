import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, of, Observable } from 'rxjs';

import { PciModel } from '../model/pci.model';
import { switchMap, tap, filter, reduce, map } from 'rxjs/operators';
import { PciDeleteResponse } from '../model/pci-delete-response.model';

@Injectable({
  providedIn: 'root'
})
export class PciService {

  private readonly _pciList$ = new BehaviorSubject<PciModel[]>(null);

  readonly pciList$ = this._pciList$.asObservable().pipe(
    tap(list => {
      if (!list) {
        this._ownersPciList();
      }
    }),
    filter(list => !!list)
  );

  private set pciList(pcis: PciModel[]) {
    this._pciList$.next(pcis);
  }

  private get pciList() {
    return this._pciList$.getValue();
  }

  constructor(
    private _httpClient: HttpClient
  ) { }

  private _ownersPciList() {
    const params = new HttpParams({
      fromObject: { "user": "current" }
    })

    this._httpClient.get<PciModel[]>('pci', { params })
      .toPromise().then(list => this.pciList = list);
  }

  pciDetail(id: string): Observable<PciModel> {
    return this.pciList$.pipe(
      map((list: PciModel[]) => {
        return list.find(pci => pci._id === id);
      })
    );
  }

  savePciDetail(details: PciModel) {
    return this._httpClient.post<PciModel>('pci', details)
      .pipe(
        tap((pci: PciModel) => {
          this.pciList = [pci, ...this.pciList];
        })
      );
  }

  updatePciDetail(detais: PciModel) {
    return this._httpClient.put<PciModel>('pci', detais).pipe(
      tap((updatedPci: PciModel) => {
        const otherPcis = this.pciList.filter(pci => pci._id !== updatedPci._id);
        this.pciList = [updatedPci, ...otherPcis];
      })
    );
  }

  deletePci(pciId: string) {
    return this._httpClient.delete<PciDeleteResponse>('pci/' + pciId)
      .pipe(
        tap((res) => {
          if (res.deleted)
            this.pciList = this.pciList.filter(pci => pci._id !== pciId);
        })
      );
  }

}
