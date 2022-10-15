import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Page } from '../../../models';


export interface BottomSheetData {
  pages: Page[],
  selectedId: string 
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'awac-overflow-menu',
  templateUrl: './overflow-menu.component.html',
  styleUrls: ['./overflow-menu.component.scss']
})
export class OverflowMenuComponent implements OnInit {

  // selectedAction: NavActionDefinition = null;

  constructor(private bottomSheetRef: MatBottomSheetRef<OverflowMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData) { }

  pageClicked(page: Page, event: any): void {
    // this.selectedAction = action;
    this.bottomSheetRef.dismiss(page);
    event && event.preventDefault();
  }

  ngOnInit() {
    // this.selectedAction = null;
  }

}
