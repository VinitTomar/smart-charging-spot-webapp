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

  get isUserLoggedInd() {
    return this._userSer.loggedIn;
  }

  constructor(
    private _userSer: UserService,
    private _router: Router,
    private _loader: GlobalLoaderService
  ) { }

  ngOnInit() {
    this._allRxjsSubscription.push(
      this._router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this._loader.showLoader();
        } else if (event instanceof NavigationEnd) {
          this._loader.hideLoader();
        }
      })
    );
  }

  logout() {
    this._userSer.logout();
  }

}
