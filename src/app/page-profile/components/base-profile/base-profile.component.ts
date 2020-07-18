import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/root';

@Component({
  selector: 'scs-base-profile',
  templateUrl: './base-profile.component.html',
  styleUrls: ['./base-profile.component.scss']
})
export class BaseProfileComponent implements OnInit {

  profile: User;

  constructor(
    private _usrSer: UserService
  ) { }

  ngOnInit() {
    this.profile = this._usrSer.details;
  }

}
