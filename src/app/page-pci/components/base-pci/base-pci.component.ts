import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PciService } from '../../services/pci.service';
import { PciModel } from '../../model/pci.model';
import { Router } from '@angular/router';

@Component({
  selector: 'scs-base-pci',
  templateUrl: './base-pci.component.html',
  styleUrls: ['./base-pci.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasePciComponent implements OnInit {

  get pciList$() {
    return this._pciService.pciList$;
  }

  constructor(
    private _pciService: PciService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  viewPciDetail(pci: PciModel) {
    this._router.navigate(['/pci/', pci._id]);
  }

}
