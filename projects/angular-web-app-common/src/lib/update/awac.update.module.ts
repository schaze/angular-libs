
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UpdateAppComponent } from './update-app/update-app.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    PortalModule,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  declarations: [
    UpdateAppComponent
  ],
  exports: [
    UpdateAppComponent
  ]
})
export class AwacUpdateModule { }
