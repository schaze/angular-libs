import { Subject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { Page } from '../../models';

@Component({
  selector: 'awac-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();

  @Input() pages: Page[] | null = [];

  // _activePage = null;
  @Input() activePage: Page | null = null;
  @Output() activePageChange = new EventEmitter<Page>();


  constructor() { }

  ngOnInit() {
  }

  public onNavSelected(page: Page) {
    // console.log("navMenu selected: ", page);
    this.activePageChange.emit(page);
    this.activePage = page;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
