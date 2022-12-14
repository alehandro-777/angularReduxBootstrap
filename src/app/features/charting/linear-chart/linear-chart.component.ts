import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit, OnChanges {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() offset = 0;
  @Input() fixed = 3;  
  @Input() k = 0.000001;  
  @Input() dt = "";
  @Input() long = 4662000;
  @Input() max = 30550000;
  @Input() title = 'ПСГ';

  value = 0;


  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align:"start"
      },
      
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels && value > 0) {
            //return ctx.chart.data.labels[ctx.dataIndex];  //return label 
            return value.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
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

      title: {
        display: true,
        //text: this.title
    }

    }
  };
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Техн-активний', 'Необоротний', 'Вільно' ],
    datasets: [ {
      data: [ ],
      backgroundColor:[
        'SpringGreen',
        'Yellow',
        'DodgerBlue'
      ]
    } ],
    
  };

  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [ DatalabelsPlugin ];

  constructor() { }

  ngOnInit(): void {
    if (this.pieChartOptions && this.pieChartOptions && this.pieChartOptions.plugins && this.pieChartOptions.plugins.title){
      this.pieChartOptions.plugins.title.text= this.title;
    } 
    this.chart?.render();
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 0) {
        let times = this.selectPrevNextTimeStampes(this.dt);

        let curr = values.find(v=> v.time_stamp.toString() == times[this.offset+1]);
        if(curr) {
          let act = this.k * curr.value;
          let long = this.k * this.long;
          let free = this.k * (this.max - curr.value - this.long);

          this.pieChartData.datasets[0].data = [act, long, free];

          this.chart?.update();
        } else {
          this.value = 0; 
        }
     
      }
      else {
        this.value = 0; 
      }
    }
  }

  selectPrevNextTimeStampes(dtIso:string) :string[] {

    //console.log(dtIso);
    let d1 = new Date(dtIso);
    d1.setHours(7);
    let d0 = new Date(dtIso);
    d0.setHours(7);
    d0.setTime(d0.getTime() - 1 * 24 * 3600 * 1000);
    let d2 = new Date(dtIso);
    d2.setHours(7);
    d2.setTime(d2.getTime() + 1 * 24 * 3600 * 1000);

    return [d0.toISOString(), d1.toISOString(), d2.toISOString()];
  }
}
