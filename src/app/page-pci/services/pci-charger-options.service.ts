import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PciChargerOptionModel } from '../model/pci-charger-option.model';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PciChargerOptionsService {

  private _options: PciChargerOptionModel[];

  constructor(
    private _httpClient: HttpClient
  ) { }


  options() {
    if (this._options) {
      return of(this._options);
    }

    return this._httpClient.get<PciChargerOptionModel[]>('pci/charger-option')
      .pipe(tap(options => this._options = options));
  }


}
