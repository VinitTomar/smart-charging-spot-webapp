import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PciService } from '../../services/pci.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'scs-pci-detail',
  templateUrl: './pci-detail.component.html',
  styleUrls: ['./pci-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PciDetailComponent implements OnInit {

  get pciId() {
    return this._activeRoute.snapshot.paramMap.get("id");
  }

  get pciDetail$() {
    return this._pciServie.pciDetail(this.pciId).pipe(
      tap(detail => {
        if (!detail) {
          this._router.navigateByUrl('404', { skipLocationChange: true });
        }
      })
    );
  }

  constructor(
    private _activeRoute: ActivatedRoute,
    private _pciServie: PciService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

}
