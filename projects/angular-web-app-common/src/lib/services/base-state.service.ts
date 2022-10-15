import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { filter, mapTo, take, takeUntil, tap } from 'rxjs/operators';
import { AuthInfo, ScreenSize, Page } from '../models';
import { EffectStateService } from './effect-state.service';


@Injectable({
  providedIn: 'root'
})
export class BaseStateService extends EffectStateService {

  // PAGES
  private readonly _pages = new BehaviorSubject<Page[]>([]);
  readonly pages$ = this._pages.asObservable();

  public get pages(): Page[] {
    return this._pages.getValue();
  }

  public set pages(val: Page[]) {
    this._pages.next(val);
  }


  // ACTIVEPAGE
  private readonly _activePage = new BehaviorSubject<Page | undefined>(undefined);
  readonly activePage$ = this._activePage.asObservable();

  public get activePage(): Page | undefined {
    return this._activePage.getValue();
  }

  public set activePage(val: Page | undefined) {
    this._activePage.next(val);
  }

  // DARKTHEME
  private readonly _darkTheme = new BehaviorSubject<boolean | undefined>(undefined);
  readonly darkTheme$ = this._darkTheme.asObservable();

  public get darkTheme(): boolean | undefined {
    return this._darkTheme.getValue();
  }

  public set darkTheme(val: boolean | undefined) {
    // console.log("Setting Darktheme to: ", val);
    this._darkTheme.next(val);
  }


  // AUTHINFO
  private readonly _authInfo = new BehaviorSubject<AuthInfo | undefined>(undefined);
  readonly authInfo$ = this._authInfo.asObservable();

  public get authInfo(): AuthInfo | undefined {
    return this._authInfo.getValue();
  }

  public set authInfo(val: AuthInfo | undefined) {
    this._authInfo.next(val);
  }

  // REFRESH Request
  protected readonly _refreshRequest = new Subject<boolean>();
  readonly refreshRequest$ = this._refreshRequest.asObservable();

  public set refreshRequest(val: boolean) {
    this._refreshRequest.next(val);
  }

  small$ = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
    filter(result => result.matches),
    mapTo(ScreenSize.small)
  );
  medium$ = this.breakpointObserver.observe(Breakpoints.Medium).pipe(
    filter(result => result.matches),
    mapTo(ScreenSize.medium),
  );
  large$ = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).pipe(
    filter(result => result.matches),
    mapTo(ScreenSize.large)
  );

  screenSize$ = merge(
    this.small$, this.medium$, this.large$
  );

  public get screeSize(): ScreenSize {
    if (this.breakpointObserver.isMatched([Breakpoints.Small, Breakpoints.XSmall])){ return ScreenSize.small;}
    if (this.breakpointObserver.isMatched(Breakpoints.Medium)){ return ScreenSize.medium;}
    if (this.breakpointObserver.isMatched([Breakpoints.Large, Breakpoints.XLarge])){ return ScreenSize.large;}
    return ScreenSize.large;
  }


  constructor(protected breakpointObserver: BreakpointObserver, protected router: Router) {
    super();
    // const found$=new Subject<boolean>();

    // Router SideEffects
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntil(this.onDestroy$), // catch inital url
    ).subscribe({
      next: (event)=>{
        {
          this.pages.forEach(page => {        
            if (page.url === event.url || page.url === event?.urlAfterRedirects) {
              this.activePage = page;
              // found$.next(true);
            }
          });
        }
      }
    }
    
    )

    // PageUpdate Sideeffects
    this.pages$.pipe(
      tap(pages => {
        // console.log("Trying to update activePage based on current URL:", this.router.url);
        for (let index = 0; index < pages.length; index++) {
          const page = pages[index];
          if (page.url === this.router.url) {
            this.activePage = page;
            return;
          }
        }
      }),
      takeUntil(this.onDestroy$)
    ).subscribe();

  }


}
