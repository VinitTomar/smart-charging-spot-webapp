import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'scs-shrine',
  templateUrl: './shrine.component.html',
  styleUrls: ['./shrine.component.scss']
})
export class ShrineComponent implements OnInit {

  get isUserLoggedInd() {
    return this._userSer.loggedIn;
  }

  constructor(
    private _userSer: UserService
  ) { }

  ngOnInit() {
  }

  logout() {
    this._userSer.logout();
  }

}
