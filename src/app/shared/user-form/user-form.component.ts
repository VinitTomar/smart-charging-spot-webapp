import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvailibiltyCheckerValidator } from './validators/availability-checker';

@Component({
  selector: 'scs-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  exportAs: 'UserFormComponent'
})
export class UserFormComponent implements OnInit {
  form: FormGroup;

  get usernameFC() {
    return this.form.get('username');
  }
  get usernameError() {
    return this.usernameFC.hasError('required') ? 'Username is required'
      : this.usernameFC.hasError('pattern') ? 'Only alphanumeric, with underscore, allowed.'
        : this.usernameFC.hasError('maxlength') ? 'Maximum 100 characters allowed'
          : this.usernameFC.hasError('notAvailable') ? 'Username not available.' : '';
  }

  get fullnameFC() {
    return this.form.get('fullname');
  }
  get fullnameError() {
    return this.fullnameFC.hasError('required') ? 'Fullname is required'
      : this.fullnameFC.hasError('pattern') ? 'Only alphabets, with space, allowed.'
        : this.fullnameFC.hasError('maxlength') ? 'Maximum 150 characters allowed' : '';
  }

  get emailFC() {
    return this.form.get('email');
  }
  get emailError() {
    return this.emailFC.hasError('required') ? 'Email is required'
      : this.emailFC.hasError('pattern') ? 'Invalid email address.'
        : this.emailFC.hasError('maxlength') ? 'Maximum 250 characters allowed'
          : this.emailFC.hasError('notAvailable') ? 'Email not available.' : '';
  }

  get passwordFC() {
    return this.form.get('password');
  }
  get passwordError() {
    return this.passwordFC.hasError('required') ? 'Password is required'
      : this.passwordFC.hasError('pattern') ? 'Invalid password address.'
        : this.passwordFC.hasError('minlength') ? 'Minimum 3 characters reqired'
          : this.passwordFC.hasError('maxlength') ? 'Maximum 250 characters allowed' : '';
  }

  constructor(
    private _fb: FormBuilder,
    private _chkValidator: AvailibiltyCheckerValidator
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      'username': [,
        [
          Validators.required,
          Validators.pattern(/^[\w]+$/),
          Validators.maxLength(100),
        ],
        [
          this._chkValidator.checkUsernameAvailability()
        ]
      ],
      'fullname': [, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.maxLength(150),
      ]],
      'email': [,
        [
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
          Validators.maxLength(250),
        ],
        [
          this._chkValidator.checkEmailAvailability()
        ]
      ],
      'password': [, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ]]
    });
  }

}
