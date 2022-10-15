import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Directive, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../../models';


@Directive({
  selector: 'awac-nav-header, [awac-nav-header], [awacNavHeader]',
  host: { 'class': 'awac-nav-header' }
})
export class MainNavHeaderDirective { }


@Directive({
  selector: 'awac-nav-toolbar-actions, [awac-nav-toolbar-actions], [awacNavToolbarActions]',
  host: { 'class': 'awac-nav-toolbar-actions' }
})
export class MainNavToolbarActionsDirective { }

@Component({
  selector: 'awac-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  mode$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => {
      if (result.matches) { // on handset mode we show the menu over the page
        return 'over'
      } else { // if we are not in handset mode
        if (this.showSidebarOnDesktop) { // and the sidebar should always be visible, we set mode to side
          return 'side';
        }
        return 'over';
      }
    })
  )


  @Input() showSidebarOnDesktop: boolean | null = true;

  @Input() title: string | null = 'App';

  @Input() pages: Page[] | null = [];

  @Input() activePage: Page | null = null;

  @Output()
  activePageChange = new EventEmitter<Page>();

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

  }

  navSelected(page: Page) {
    // console.log("MainNav selected: ", page);
    this.activePage = page;
    this.activePageChange.emit(page);
  }


}
