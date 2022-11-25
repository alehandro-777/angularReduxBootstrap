import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Value } from './gas-storage-map.models';

import * as opDataActions from '../../../state/opdata.actions'
import * as opDataSelectors from '../../../state/opdata.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gas-storage-map',
  templateUrl: './gas-storage-map.component.html',
  styleUrls: ['./gas-storage-map.component.scss']
})
export class GasStorageMapComponent implements OnInit, OnDestroy {

  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);

  D0:string="";
  D1:string="";
  D2:string="";

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.currDay$.subscribe(d=> {
    this.store.dispatch(opDataActions.loadOpdata({ url:"/charts" }));

    this.D1 = `${d.day}.${d.month}.${d.year}`;
    let next = this.calendar.getNext(d);
    let prev = this.calendar.getPrev(d);
    this.D0 = `${prev.day}.${prev.month}.${prev.year}`;
    this.D2 = `${next.day}.${next.month}.${next.year}`;
  });

  constructor(private store: Store, private calendar: NgbCalendar) { }

  ngOnInit(): void {
 
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
