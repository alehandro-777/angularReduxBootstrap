import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Value } from './gas-storage-map.models';

import * as opDataActions from '../../../state/opdata.actions'
import * as opDataSelectors from '../../../state/opdata.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'

@Component({
  selector: 'app-gas-storage-map',
  templateUrl: './gas-storage-map.component.html',
  styleUrls: ['./gas-storage-map.component.scss']
})
export class GasStorageMapComponent implements OnInit, OnDestroy {

  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.currDay$.subscribe(d=> {
    this.store.dispatch(opDataActions.loadOpdata({ url:"/charts" }));
  });

  constructor(private store: Store) { }

  ngOnInit(): void {
 
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
