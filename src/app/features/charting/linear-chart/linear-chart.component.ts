import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {
  title = 'ng2-charts-demo';

  // Pie
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  
  pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];

  pieChartLegend = true;
  pieChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }



  
}
