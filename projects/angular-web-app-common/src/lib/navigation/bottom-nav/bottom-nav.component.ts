import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetData, OverflowMenuComponent } from './overflow-menu/overflow-menu.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Page } from '../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'awac-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<boolean>();

  menuRef: MatBottomSheetRef<OverflowMenuComponent> | null = null;

  _pages: Page[] = [];

  @Input()
  set pages(value: Page[] | null | undefined) {
    this._pages = value || [];
  }

  get pages(): Page[] | null | undefined{
    return this._pages;
  }

  @Input()
  selectedId: string | null = '';

  @Input()
  overflowItemCount = 5; // when there are more than this items in action they will be put in an overflow menu

  @Output()
  actionSelected = new EventEmitter<Page>();


  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    // console.log(this.actions);
  }




  pageClicked(page: Page) {
    this.actionSelected.emit(page);
    // console.log('action: ', action);
  }

  overflowMenu() {
    this.menuRef = this.bottomSheet.open(OverflowMenuComponent,
      { data: <BottomSheetData>{ pages: this._pages?.slice(this.overflowItemCount - 1), selectedId: this.selectedId } });
    this.menuRef.afterDismissed().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
      (data: Page) => {
        if (!!data) {
          this.pageClicked(data);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
