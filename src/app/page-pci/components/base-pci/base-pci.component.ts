import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PciService } from '../../services/pci.service';
import { PciModel } from '../../model/pci.model';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/confirmation/services/confirmation.service';

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
    private _router: Router,
    private _confirmService: ConfirmationService<any>
  ) { }

  ngOnInit() {
  }

  viewPciDetail(pci: PciModel) {
    this._router.navigate(['/pci/', pci._id]);
  }

  deletePci(pci: PciModel) {
    this._confirmService.askForConfirmation({
      action: this._pciService.deletePci(pci._id),
      message: `Are you sure, You want to delte ${pci.name} pci?`
    }).afterClosed().subscribe(res => {
      console.log({ res });
    })
  }

}
