import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Value } from './temperature-map.models';

import * as dataActions from '../../../state/opdata.actions'
import * as weatherActions from '../../../state/temperatures.actions'
import * as weatherSelectors from '../../../state/temperatures.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-temperature-map',
  templateUrl: './temperature-map.component.html',
  styleUrls: ['./temperature-map.component.scss']
})
export class TemperatureMapComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  dataMap$ = this.store.select(weatherSelectors.selectWheatherMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDateIso);

  dateTimeIso:string="";

  //order from west to east
  cityOrder = [6,12,8,2,18,23,16,21,1,5,9,14,24,13,22,10,20,15,17,3,7,19,4,11];


  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Середня температура наступний тиждень',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',

        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //pointRadius: 2,

        fill: 'origin',
      }
    // ... add dataset here
    ],
      //labels: ["Закарпатська","Львівська","Івано-Франківська","Волинська","Тернопільська","Чернівецька","Рівненська",
      //"Хмельницька","Вінницька","Житомирська","Київська","Одеська","Чернігівська","Миколаївська","Черкаська","Херсонська",
      //"Полтавська","Сумська","Дніпропетровська","Запорізька","Харківська","Донецька","Луганська"]

    };

    lineChartOptions: ChartConfiguration['options'] = {
      elements: {
        line: {
          tension: 0.5
        }
      },
      plugins:{
        tooltip:{
          enabled: true
        },
        legend:{
          labels: {
          }
        },
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.chart.data.labels && value > 0) {
              //return ctx.chart.data.labels[ctx.dataIndex];  //return label 
              return "";
            }
            return ''
          }, 
          font: (ctx) => {
            return {
              weight:"bold",
              size:16
            };
          }
        },
      }
    };
    
  lineChartType: ChartType = 'line';

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
    let d = this.selectLineData(25,3, map);
    let v = d.map(v=> v.value);
    let l = d.map(v=> new Date(v.time_stamp).toLocaleDateString());
    this.lineChartData.datasets[0].data = v;
    this.lineChartData.labels =l;
    this.chart?.update();
  });

  sub2 = this.currDay$.subscribe(d=> {
    this.store.dispatch(weatherActions.loadApidata());
    this.dateTimeIso = d;
 
  });

  constructor(private store: Store, private calendar: NgbCalendar) { }

  ngOnInit(): void {
 
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  decode(order: number[], map : Map<string, Value[]>) : number[] {
    let res: number[] = [];
    order.forEach( (location_id, i) => {
      let values = map.get(location_id.toString());
      if (values && values.length == 3) {
        res[i] = Math.round(values[2].value);
      }
    });
    return res;
  }

  selectLineData(location_id: number, param:number, map : Map<string, Value[]>) : Value[] {
    let res: Value[] = [];
    let v = map.get(`${location_id}`);
    if (!v) return res;
    return v.filter(v=> v.parameter == param);
  }


  
  export() : void {
    this.store.dispatch(dataActions.xlsExportRange( {
      objects: [25], 
      parameters: [1,2,3],
      fileName: `Україна_загалом_погода_весь_період.xlsx`,   //TODO !!!
      from: "2020-01-01",
      to: "2025-01-01"
      }));
  }
}

