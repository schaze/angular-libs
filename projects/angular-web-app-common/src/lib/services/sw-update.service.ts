import { ApplicationRef, Injectable, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UpdateAppComponent } from '../update/update-app/update-app.component';
import { first, interval, concat, Subject, takeUntil } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SwUpdateService implements OnDestroy {
  onDestroy$ = new Subject<boolean>();

  ref: MatBottomSheetRef<UpdateAppComponent, any> | undefined = undefined;
  constructor(appRef: ApplicationRef, private swUpdate: SwUpdate, private bottomSheet: MatBottomSheet) {


    if (this.swUpdate.isEnabled) {

      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
      everySixHoursOnceAppIsStable$.pipe(takeUntil(this.onDestroy$)).subscribe(() => swUpdate.checkForUpdate());

      this.swUpdate.versionUpdates.pipe(takeUntil(this.onDestroy$)).subscribe((ve) => {
        ve.type
        if (this.ref) {
          this.ref.dismiss();
        }
        this.ref = this.bottomSheet.open(UpdateAppComponent);
      });
    }

  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
