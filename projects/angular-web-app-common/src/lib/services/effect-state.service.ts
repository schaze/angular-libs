import { Injectable, OnDestroy } from '@angular/core';
import { asyncScheduler, BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, observeOn, share, switchMap, take, takeUntil, tap } from 'rxjs/operators';

export const STATEACTION_INIT = 'init';
export const STATEACTION_DESTROY = 'destroy';
export interface StateAction {
  type: string;
  payload?: any;
}


@Injectable({
  providedIn: 'root'
})
export  class EffectStateService implements OnDestroy {

  protected onDestroy$ = new Subject<boolean>();

  private _effects$ = new BehaviorSubject<Observable<any>[]>([]);

  private _actions$ = new Subject<StateAction>();
  public actions$ = this._actions$.asObservable();


  constructor() {
    this._effects$.pipe(
      switchMap(effects => merge(...effects.map(effect => effect))),
      takeUntil(this.onDestroy$)
    ).subscribe({
      error: error => {
        console.error('Uncaught error in state effects subscription - effects loop broken!', error);
      }
    });
  }


  createEffect(source: Observable<any>) {
    const obsErrorHandled = source.pipe(
        catchError((error) => {
          console.error('Error in State Effects subscription!', error);
          return of({});
        })
      )
    
    this._effects$.next([...this._effects$.value, obsErrorHandled]);
    return obsErrorHandled;
  }

  dispatch(action: StateAction) {
    this._actions$.next(action);
  }

  ngOnDestroy(): void {
    this.dispatch({ type: STATEACTION_DESTROY });
    this.onDestroy$.next(true);
  }
}
