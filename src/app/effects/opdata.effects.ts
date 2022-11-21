import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as opDataActions from '../state/opdata.actions';
import { catchError, map, mergeMap,  withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GasStorageMapService } from '../features/dashboards/gas-storage-map/gas-storage-map.service';
import { selectCalendarDate } from '../state/calendar.selectors';
import { of } from 'rxjs';


@Injectable()
export class OpdataEffects {
  //
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(opDataActions.loadOpdata),
      withLatestFrom(this.store.select(selectCalendarDate)),
      mergeMap((md) => this.opDataService.get(md[0].url, `${md[1].year}-${md[1].month}-${md[1].day}`).pipe(

            map( payload => (opDataActions.loadOpSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(opDataActions.loadOpdataError(error)) ) //=> Error
            )),        
    )
  );  
  



  constructor(
    private store: Store,
    private actions$: Actions,
    private opDataService: GasStorageMapService
  ) {}
}