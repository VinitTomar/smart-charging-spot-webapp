import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveIfLoggedInGuard } from './resolve-if-logged-in.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ResolveIfLoggedInGuard
  ]
})
export class AfterLoggedInModule { }
