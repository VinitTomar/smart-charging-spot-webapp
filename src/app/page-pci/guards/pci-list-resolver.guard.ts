import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';

import { PciModel } from '../model/pci.model';
import { PciService } from '../services/pci.service';
import { PciChargerOptionsService } from '../services/pci-charger-options.service';
import { PciChargerOptionModel } from '../model/pci-charger-option.model';

@Injectable({
  providedIn: 'root'
})
export class PciListResolverGuard implements Resolve<[PciModel[], PciChargerOptionModel[]]> {

  constructor(
    private _pciService: PciService,
    private _pciChargerOptionsService: PciChargerOptionsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[PciModel[], PciChargerOptionModel[]]> {
    return combineLatest(
      this._pciService.pciList$.pipe(first()),
      this._pciChargerOptionsService.options().pipe(first())
    );
  }
}
