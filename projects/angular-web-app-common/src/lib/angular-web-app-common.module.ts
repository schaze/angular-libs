import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AwacCommonModule } from './common/awac.common.module';
import { AwacNavigationModule } from './navigation';
import { AwacUpdateModule } from './update';





@NgModule({
  declarations: [
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AwacCommonModule,
    AwacNavigationModule,
    AwacUpdateModule
  ],
  exports: [
    AwacCommonModule,
    AwacNavigationModule,
    AwacUpdateModule,
  ]
})
export class AngularWebAppCommonModule { }
