import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Value } from './temperature-map.models';

import * as weatherActions from '../../../state/temperatures.actions'
import * as weatherSelectors from '../../../state/temperatures.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-temperature-map',
  templateUrl: './temperature-map.component.html',
  styleUrls: ['./temperature-map.component.scss']
})
export class TemperatureMapComponent implements OnInit, OnDestroy {

  dataMap$ = this.store.select(weatherSelectors.selectWheatherMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);

  D0:string="";
  D1:string="";
  D2:string="";


  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 5, 6, 7, 8, 7, 6, 5, 6, 7, 8, 7, 6, 5, 6, 7, 8, 7, 6, 5, 6, 7, 8, 7, 6 ],
        label: 'Average T',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',

        fill: 'false',
      }
    // ... add dataset here
    ],
      labels: ["Закарпатська","Львівська","Івано-Франківська","Волинська","Тернопільська","Чернівецька","Рівненська",
      "Хмельницька","Вінницька","Житомирська","Київська","Одеська","Чернігівська","Миколаївська","Черкаська","Херсонська",
      "Полтавська","Сумська","Дніпропетровська","Запорізька","Харківська","Донецька","Луганська"]
    };

    lineChartOptions: ChartConfiguration['options'] = {
      elements: {
        line: {
          tension: 0.5
        }
      }
    };
    
  lineChartType: ChartType = 'line';

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.currDay$.subscribe(d=> {
    this.store.dispatch(weatherActions.loadApidata());

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

