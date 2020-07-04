import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './root/components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
