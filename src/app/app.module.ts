import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import {
  HomeComponent, NotFoundComponent, ShrineComponent, AddBearerToken, ServerErrorHandler
} from './root';


@NgModule({
  declarations: [
    ShrineComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule
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
  bootstrap: [ShrineComponent]
})
export class AppModule { }
