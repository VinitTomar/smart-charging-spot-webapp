import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService, User } from 'src/app/root';
import { UserFormComponent } from 'src/app/shared/user-form';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'scs-base-profile',
  templateUrl: './base-profile.component.html',
  styleUrls: ['./base-profile.component.scss'],
})
export class BaseProfileComponent implements OnInit {

  edit = false;
  updateInProgress = false;

  @ViewChild(UserFormComponent, { static: false })
  userFormComponent: UserFormComponent;

  get profile(): User {
    return this._usrSer.details;
  }

  get form() {
    return this.userFormComponent.form;
  }

  get username() {
    return this.profile.username;
  }

  get email() {
    return this.profile.email;
  }

  get fullname() {
    return this.profile.fullname;
  }

  constructor(
    private _usrSer: UserService,
    private _profileSer: ProfileService
  ) { }

  ngOnInit() {
    // this.profile = this._usrSer.details;
  }

  editDetails() {
    this.edit = true;
    setTimeout(() => {
      const { username, email, fullname, password } = { ...this.profile, password: '' };

      this.userFormComponent.emailFC.disable();
      this.userFormComponent.usernameFC.disable();
      this.form.setValue({ username, email, fullname, password });
    }, 0);
  }

  update() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.updateInProgress = true;

    this._profileSer.update(this.form.value).subscribe(res => {
      this.updateInProgress = false;
      this.edit = false;
      this._usrSer.details = res;
    });
  }

  cancel() {
    this.edit = false;
  }

}
