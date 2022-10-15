
import { NgModule, Injectable } from '@angular/core';
import { NgLetDirective } from './directives/ng-let.directive';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IconComponent } from './components/icon/icon.component';
import { PGBarComponent } from './components/pgbar/pgbar.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import {  MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    MatSlideToggleModule
  ],
  exports: [
    NgLetDirective,
    IconComponent,
    PGBarComponent,
    UserAvatarComponent
  ],
  declarations: [
    NgLetDirective,
    IconComponent,
    PGBarComponent,
    UserAvatarComponent
  ],
  providers: [
    MatIconRegistry
  ]
})
export class AwacCommonModule { 
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fas');
  }
}
