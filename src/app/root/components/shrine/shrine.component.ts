import { Component, OnInit } from '@angular/core';
import { UserService, GlobalLoaderService } from '../../services';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scs-shrine',
  templateUrl: './shrine.component.html',
  styleUrls: ['./shrine.component.scss']
})
export class ShrineComponent implements OnInit {

  private _allRxjsSubscription: Subscription[] = [];

  get isUserLoggedIn() {
    return this._userSer.loggedIn;
  }

  private _showLoaderRequest = false;

  constructor(
    private _userSer: UserService,
    private _router: Router,
    private _loader: GlobalLoaderService
  ) { }

  ngOnInit() {
    this._allRxjsSubscription.push(
      this._router.events.subscribe(event => {
        if (event instanceof NavigationStart && !this._showLoaderRequest) {
          this._showLoaderRequest = true;
          this._loader.showLoader();
        } else if (event instanceof NavigationEnd) {
          this._loader.hideLoader();
          this._showLoaderRequest = false;
        }
      })
    );
  }

  logout() {
    this._userSer.logout();
  }

}
