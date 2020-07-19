import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatProgressBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import {
  HomeComponent, NotFoundComponent, ShrineComponent, GlobalLoaderComponent
} from './root/components';
import {
  ProxyInterceptor, AddBearerToken, JwtErrorHandlerService, ServerErrorHandler
} from './root/interceptors';




@NgModule({
  declarations: [
    ShrineComponent,
    HomeComponent,
    NotFoundComponent,
    GlobalLoaderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProxyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddBearerToken,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtErrorHandlerService,
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
