
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AwacCommonModule } from '../common';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { OverflowMenuComponent } from './bottom-nav/overflow-menu/overflow-menu.component';
import { MainNavComponent, MainNavHeaderDirective, MainNavToolbarActionsDirective } from './main-nav/main-nav.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SideMenuProfileComponent } from './side-menu-profile/side-menu-profile.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AwacCommonModule,
    PortalModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
  ],
  declarations: [
    MainNavComponent,
    MainNavHeaderDirective,
    MainNavToolbarActionsDirective,
    NavMenuComponent,
    BottomNavComponent,
    OverflowMenuComponent,
    SideMenuProfileComponent
  ],
  exports: [
    MainNavComponent,
    MainNavHeaderDirective,
    MainNavToolbarActionsDirective,
    NavMenuComponent,
    BottomNavComponent,
    OverflowMenuComponent,
    SideMenuProfileComponent
  ]
})
export class AwacNavigationModule { }
