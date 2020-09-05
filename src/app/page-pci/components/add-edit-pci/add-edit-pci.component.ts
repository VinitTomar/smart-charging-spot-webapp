import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs/operators';

import { PciChargerOptionModel } from '../../model/pci-charger-option.model';
import { PciChargerModel } from '../../model/pci-charger.model';
import { PciChargerOptionsService } from '../../services/pci-charger-options.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PciModel } from '../../model/pci.model';
import { PciService } from '../../services/pci.service';
import { deepClone } from 'src/app/util/deep-clone';


@Component({
  selector: 'scs-add-edit-pci',
  templateUrl: './add-edit-pci.component.html',
  styleUrls: ['./add-edit-pci.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditPciComponent implements OnInit, OnDestroy {
  step = 1;
  addedChargers: PciChargerModel[] = [];
  selectedCharger: PciChargerOptionModel;
  basicInfoForm: FormGroup;
  addressForm: FormGroup;
  pciAjaxInprogress = false;

  private readonly _allRxjsSubscriptions: Subscription[] = [];

  get nameFC() {
    return this.basicInfoForm.get('name');
  }
  get nameFCErr() {
    return this.nameFC.hasError('required') ? 'Pci name is required.'
      : this.nameFC.hasError('maxlength') ? 'Maximum 150 characters allowed.' : '';
  }

  get highWayFC() {
    return this.basicInfoForm.get('highWay');
  }
  get highWayFCErr() {
    return this.highWayFC.hasError('maxlength') ? 'Maximum 250 characters allowed.' : '';
  }

  get gpcCoordFG() {
    return (this.basicInfoForm.get('gpsCoord') as FormGroup);
  }
  get latitudeFC() {
    return this.gpcCoordFG.get('latitude');
  }
  get latitudeFCErr() {
    return this.latitudeFC.hasError('required') ? 'Latitude is required.'
      : this.latitudeFC.hasError('min') ? 'Latitude can not be less than -90.'
        : this.latitudeFC.hasError('max') ? 'Latitude can not be more than 90.'
          : this.latitudeFC.hasError('pattern') ? 'Invalid latitude value' : '';
  }
  get longitudeFC() {
    return this.gpcCoordFG.get('longitude');
  }
  get longitudeFCErr() {
    return this.longitudeFC.hasError('required') ? 'Longitude is required.'
      : this.longitudeFC.hasError('min') ? 'Longitude can not be less than -180.'
        : this.longitudeFC.hasError('max') ? 'Longitude can not be more than 180.'
          : this.longitudeFC.hasError('pattern') ? 'Invalid Longitude value' : '';
  }

  get line1FC() {
    return this.addressForm.get('line1');
  }
  get line1FCErr() {
    return this.line1FC.hasError('required') ? 'Line1 of address is required.'
      : this.line1FC.hasError('maxlength') ? 'Line1 can has maximum 250 characters' : '';
  }

  get line2FC() {
    return this.addressForm.get('line2');
  }
  get line2FCErr() {
    return this.line2FC.hasError('required') ? 'Line2 of address is required.'
      : this.line2FC.hasError('maxlength') ? 'Line2 can has maximum 250 characters' : '';
  }

  get landmarkFC() {
    return this.addressForm.get('landmark');
  }
  get landmarkFCErr() {
    return this.landmarkFC.hasError('required') ? 'Landmark of address is required.'
      : this.landmarkFC.hasError('maxlength') ? 'Landmark can has maximum 100 characters' : '';
  }

  get districtFC() {
    return this.addressForm.get('district');
  }
  get districtFCErr() {
    return this.districtFC.hasError('required') ? 'District of address is required.'
      : this.districtFC.hasError('maxlength') ? 'Discrict can has maximum 100 characters' : '';
  }

  get stateFC() {
    return this.addressForm.get('state');
  }
  get stateFCErr() {
    return this.stateFC.hasError('required') ? 'State of address is required.'
      : this.stateFC.hasError('maxlength') ? 'State can has maximum 250 characters' : '';
  }

  get pincodeFC() {
    return this.addressForm.get('pincode');
  }
  get pincodeFCErr() {
    return this.pincodeFC.hasError('required') ? 'Pincode of address is required.'
      : this.pincodeFC.hasError('pattern') ? 'Pincode is invalid' : '';
  }

  get saveBtnDisabled() {
    return ((!this.addedChargers && this.addedChargers.length < 1) || this.pciAjaxInprogress);
  }

  get pciId() {
    return this._activeRoute.snapshot.paramMap.get("id");
  }

  get avlChargers(): Observable<PciChargerOptionModel[]> {
    return this._pciChargerOptionService.options()
      .pipe(tap(options => {
        if (!this.selectedCharger)
          this.selectedCharger = options[0];
      }));
  }

  private get _pciDetail$() {
    return this._pciService.pciDetail(this.pciId).pipe(
      tap(detail => {
        if (this.pciId && !detail) {
          this._router.navigateByUrl('404', { skipLocationChange: true });
        }
      })
    );
  }

  constructor(
    private _pciService: PciService,
    private _pciChargerOptionService: PciChargerOptionsService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.basicInfoForm = this._formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(150)]],
      'highWay': ['', [Validators.maxLength(250)]],
      'gpsCoord': this._formBuilder.group({
        'latitude': ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
        'longitude': ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
      })
    });

    this.addressForm = this._formBuilder.group({
      'line1': ['', [Validators.required, Validators.maxLength(250)]],
      'line2': ['', [Validators.required, Validators.maxLength(250)]],
      'landmark': ['', [Validators.required, Validators.maxLength(100)]],
      'district': ['', [Validators.required, Validators.maxLength(100)]],
      'state': ['', [Validators.required, Validators.maxLength(100)]],
      'pincode': ['', [Validators.required, Validators.pattern(/^[\d]{6}$/)]]
    });

    this._setFormData();

  }

  ngOnDestroy() {
    this._allRxjsSubscriptions.forEach(sub => sub.unsubscribe());
  }

  private _setFormData() {
    const subsc = this._pciDetail$.subscribe(pci => {
      if (pci) {
        const clonedPci = deepClone(pci) as PciModel;
        const { name, highWay, gpsCoord } = clonedPci;
        this.basicInfoForm.setValue({ name, highWay, gpsCoord });
        this.addressForm.setValue(clonedPci.address);
        this.addedChargers = clonedPci.chargers;
      }
    });
    this._allRxjsSubscriptions.push(subsc);
  }

  private _isStepValid(nextStepIndex: number): boolean {
    switch (nextStepIndex) {
      case 2:
        if (!this.basicInfoForm.valid) {
          this.basicInfoForm.markAllAsTouched();
          return false;
        }
        return true;
      case 3:
        if (!this.basicInfoForm.valid) {
          this.basicInfoForm.markAllAsTouched();
          return false;
        }

        if (!this.addressForm.valid) {
          this.addressForm.markAllAsTouched();
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  fetchGpsCoordinates() {
    this.gpcCoordFG.disable();
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.latitudeFC.setValue(position.coords.latitude);
      this.longitudeFC.setValue(position.coords.longitude);
      this.gpcCoordFG.enable();
    }, (err: PositionError) => {
      alert(err.message);
    });
  }

  saveOrUpdatePciDetail() {
    const pciDetail: PciModel = {
      name: this.nameFC.value,
      highWay: this.highWayFC.value,
      gpsCoord: this.gpcCoordFG.value,
      address: this.addressForm.value,
      chargers: this.addedChargers
    };

    this.pciAjaxInprogress = true;

    if (this.pciId) {
      pciDetail._id = this.pciId;
      const subsc = this._pciService.updatePciDetail(pciDetail)
        .subscribe((res) => {
          this._router.navigate(['/pci', this.pciId]);
        }, err => {
          this.pciAjaxInprogress = false;
          console.log({ err });
        });
      this._allRxjsSubscriptions.push(subsc);
    } else {
      const subsc = this._pciService.savePciDetail(pciDetail)
        .subscribe((res) => {
          this._router.navigateByUrl('/pci');
        }, err => {
          this.pciAjaxInprogress = false;
          console.log({ err });
        });
      this._allRxjsSubscriptions.push(subsc);
    }
  }

  resetPciForms() {
    if (this.pciId) {
      this._setFormData();
    } else {
      this.basicInfoForm.reset();
      this.addressForm.reset();
      this.addedChargers.length = 0;
    }

    this.step = 1;
  }

  setStep(index: number) {
    if (this._isStepValid(index)) {
      this.step = index;
    }
  }

  nextStep() {
    this.setStep(this.step + 1);
  }

  prevStep() {
    this.setStep(this.step - 1);
  }

  addCharger() {
    const chargerIndex = this.addedChargers.findIndex((chrg) => chrg.type === this.selectedCharger.type && chrg.connector === this.selectedCharger.connector);

    if (chargerIndex > -1) {
      this.incChargerPoints(chargerIndex)
    } else {
      this.addedChargers.push({ ...this.selectedCharger, points: 1 });
    }

  }

  incChargerPoints(index: number) {
    this.addedChargers[index].points++;
  }

  decChargerPoints(index: number) {
    if (this.addedChargers[index].points == 1) {
      this.addedChargers.splice(index, 1);
    } else {
      this.addedChargers[index].points--;
    }
  }

}
