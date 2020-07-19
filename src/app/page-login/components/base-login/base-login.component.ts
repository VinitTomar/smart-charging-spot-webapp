import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from '../../service/login.service';
import { UserService } from 'src/app/root/services';

@Component({
  selector: 'scs-base-login',
  templateUrl: './base-login.component.html',
  styleUrls: ['./base-login.component.scss']
})
export class BaseLoginComponent implements OnInit {

  form: FormGroup;
  submittionInProgress = false;

  get usernameFC() {
    return this.form.get('username');
  }

  get usernameErr() {
    return this.usernameFC.hasError('required') ? 'Enter username'
      : this.usernameFC.hasError('invalid') ? this.usernameFC.errors.invalid : '';
  }

  get passwordFC() {
    return this.form.get('password');
  }

  get passwordErr() {
    return this.passwordFC.hasError('required') ? 'Enter password'
      : this.passwordFC.hasError('invalid') ? this.passwordFC.errors.invalid : '';
  }

  constructor(
    private _fb: FormBuilder,
    private _lgnSer: LoginService,
    private _usrSer: UserService,
  ) {
  }

  ngOnInit() {
    this.form = this._fb.group({
      'username': [, Validators.required],
      'password': [, Validators.required]
    });
  }

  submit() {

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submittionInProgress = true;

    this._lgnSer.login(this.form.value).subscribe(res => {
      this.submittionInProgress = false;
      this._usrSer.login(res.token);
    }, (errRes: HttpErrorResponse) => {
      this.submittionInProgress = false;

      if (errRes.status == 401) {
        const error = errRes.error;
        if (error.field == 'username') {
          this.usernameFC.setErrors({ invalid: error.message });
        } else {
          this.passwordFC.setErrors({ invalid: error.message });
        }

        this.form.markAllAsTouched();
      }
    });

  }

}
