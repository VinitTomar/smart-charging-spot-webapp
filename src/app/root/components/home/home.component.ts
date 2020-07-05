import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'scs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _route: Router) {
    this._route.events.subscribe(event => {
      console.log({ event });
    })
  }

  ngOnInit() {
  }

}
