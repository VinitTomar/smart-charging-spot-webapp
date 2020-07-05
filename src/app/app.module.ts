import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './root/components/home/home.component';
import { AddBearerToken, ServerErrorHandler } from './root/interceptors';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddBearerToken,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorHandler,
      multi: true
    }
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
