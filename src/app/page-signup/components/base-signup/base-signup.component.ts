import { Component, OnInit, ViewChild } from '@angular/core';

import { SignupService } from '../../service/signup.service';
import { UserFormComponent } from 'src/app/shared/user-form';
import { UserService } from 'src/app/root/services';

@Component({
  selector: 'scs-base-signup',
  templateUrl: './base-signup.component.html',
  styleUrls: ['./base-signup.component.scss']
})
export class BaseSignupComponent implements OnInit {

  registrationInProgress = false;

  @ViewChild(UserFormComponent, { static: true })
  userFormComponent: UserFormComponent;

  get form() {
    return this.userFormComponent.form;
  }

  constructor(
    private _signup: SignupService,
    private _usrSer: UserService
  ) { }

  ngOnInit() {

  }

  register() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.registrationInProgress = true;
    this._signup.register(this.form.value).subscribe(res => {
      this.registrationInProgress = false;
      // console.log({ res })
      this._usrSer.login(res.token);
    }, err => {
      // this.registrationInProgres/s = false;
      console.log({ err })
    });
  }

}
