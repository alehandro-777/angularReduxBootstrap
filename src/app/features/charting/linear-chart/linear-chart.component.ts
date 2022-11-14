import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  title = 'ng2-charts-demo';

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
          if (ctx.chart.data.labels) {
            //return ctx.chart.data.labels[ctx.dataIndex];  //return label 
            return value;
          }
          return ''
        }, 
      },
      subtitle:{
        text:'subtitle'
      },
      title: {
        text:'title'
      }
    }
  };
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'aaaaaaaaaaaaa', 'bbbbbbbbbbbb', 'ccccccccccc' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };

  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [ DatalabelsPlugin ];

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  
}
