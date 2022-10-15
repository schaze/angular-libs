# AngularWebAppCommon

A base library for most commonly needed features in a generic web application.
Also it serves as a notepad for best practices when creating angular applications.

## General notes on creating an angular app.
In a generic setup serving UI and API from an express app we want to split the repo in the following folders:

```
root
 |- backend
 |- frontend    <-- angular app goes here
 |- .drone.yaml
 |- ..
```
In order to skip folder creation and specify package manager, routing, etc use the follwoing command in the frontend folder:
```bash
ng new <app-name> --packageManager=yarn --routing=true --skipTests=true --style=scss --directory=.
```

### Add angular material:
```
ng add @angular/material
ng add @angular/cdk
```

### Add PWA support
```
ng add @angular/pwa
```

### Fontawsome needs to be installed for awac to work
```
yarn add @fortawesome/fontawesome-free
```

## Usage

BAse library providing most commonly used components and features in angular web apps. (Software Update notification, navigation (sidebar and bottom navigation) with User Profile, extended icons [font-awesome + angular material], basic state service, simple login screen, material dark theming helpers ...)

This library provides components using angular material and fontawesome. For it to work correctly you need to import the scss styling and call the mixin 'awac-core'.
The lib also provides a sime make-base-theme mixin which can be used to create a dark theme.

```scss
@import '~@angular/material/theming';

@include mat-core;

@import '~home-base/styles/awac-styles.scss';
@import "app-theme.scss";


$app-primary: mat-palette($mat-indigo);
$app-accent: mat-palette($mat-pink, A200, A100, A400);
$app-warn: mat-palette($mat-red);

// Create light theme
$app-theme: mat-light-theme($app-primary, $app-accent, $app-warn);

@include angular-material-theme($app-theme);
@include awac-core($app-theme);
@include make-app-theme($app-theme);

// Create dark theme
.dark-theme {
    $dark-app-theme: mat-dark-theme($app-primary, $app-accent, $app-warn);

    @include angular-material-theme($dark-app-theme);
    @include make-base-theme($dark-app-theme);
}
```
app-theme.scss:
```scss
@mixin make-app-theme($theme) {
    // Extract the palettes you need from the theme definition.
    $mprimary: map-get($theme, primary);
    $maccent: map-get($theme, accent);
    $mwarn: map-get($theme, warn);

    $mbackground: map-get($theme, background);
    $mforeground: map-get($theme, foreground);

}


```

## General changes to default angular settings:

add all exceptions in ngsw-config.json for out of router paths that are used with "navigationUrls" array:

```json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "navigationUrls":[
    "/**",
    "!/auth/**",
    "!/auth",
    "!/logout"
  ],
```

Edit angular.json file and replace the "src/styles.scss" entry at all plaxes with "src/scss/main.scss"


## Setup the application

add a state service and extend from BaseStateService:

```bash
ng g s services/state
```

```typescript
import { Injectable } from '@angular/core';
import { BaseStateService } from 'angular-web-app-common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BaseStateService {

  constructor(breakpointObserver: BreakpointObserver, router: Router) {
     super(breakpointObserver, router);
  }
}


```

### Setup base application

Add something similar to this to your AppComponent

```typescript
import { Component, Renderer2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SwUpdateService, Page } from 'angular-web-app-common';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { StateService } from './services/state.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hc-dashboard';
  onDestroy$ = new Subject<boolean>();

  pages = [
    { id: 'test', title: "Tester", url: "/test", icon: "help" },
  ]


  pages$ = this.state.pages$;
  activePage$ = this.state.activePage$;

  avatarUrl$ = this.state.authInfo$.pipe(
    map(authInfo => {
      return authInfo.avatarUrl
    })
  )

  name$ = this.state.authInfo$.pipe(
    map(authInfo => {
      return authInfo.name
    })
  )

  darkMode$ = this.state.darkTheme$;

  constructor(
    private state: StateService,
    public swUpdateService: SwUpdateService,
    private renderer: Renderer2,
    public overlayContainer: OverlayContainer,
    private meta: Meta) {


    this.state.pages = this.pages;


    this.darkMode$.pipe( // Applying dark theme extras (e.g. Overlaycontainer -- for dialogs and such, theme color...)
      takeUntil(this.onDestroy$)
    ).subscribe((enable) => {
      if (enable) {
        overlayContainer.getContainerElement().classList.add('dark-theme');
        this.renderer.addClass(document.body, 'dark-theme');
      } else {
        overlayContainer.getContainerElement().classList.remove('dark-theme');
        this.renderer.removeClass(document.body, 'dark-theme');
      }
      this.updateThemeColor();
    });
  }

  private updateThemeColor() {
    setTimeout(() => { // dirty hack -- not 'angulary' -- but it works
      const elem = document.querySelector('.mat-sidenav-container');
      console.log("Checking Theme color... ");
      if (!!elem) {
        const style = getComputedStyle(elem);
        console.log("Themecolor: ",style.backgroundColor);
        // window.alert("Themecolor: " + style.backgroundColor);
        this.meta.updateTag({ name: 'theme-color', content: style.backgroundColor });
      }
    }, 300);
  }


  setDarkMode(mode: boolean){
    this.state.darkTheme=mode;
  }

  refresh(){
    this.state.refreshRequest=true;
    console.log("Refresh!");
  }

  navigate(page: Page){
    console.log("Navigate to: ", page);
    
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
```

Html Template:
```html
<div [ngClass]="{'dark-theme': darkMode$ | async}">

  <awac-main-nav [pages]="pages$|async" [activePage]="activePage$ | async" (activePageChange)="navigate($event)"
    [avatarUrl]="avatarUrl$|async" [name]="name$|async" [darkMode]="darkMode$ | async" (darkModeChange)="setDarkMode($event)"
    (refreshRequest)="refresh()" [showSidebarOnDesktop]="true">
    <div class="main-div">
      <div class="main-container">
         <router-outlet></router-outlet>
      </div>
    </div>

  </awac-main-nav>

  <awac-bottom-nav [pages]="pages$|async" [selectedId]="(activePage$ | async)?.id" (actionSelected)="navigate($event)">
  </awac-bottom-nav>


</div>
```

Update index.html body tag:
```html
<body class="mat-app-background" >
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.