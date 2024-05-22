import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { createChart } from 'lightweight-charts';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  @ViewChild('chart', {static: true})
  chart: any| ElementRef;
  
  name = 'Chart';

  constructor() {}

  ngOnInit() {
    const chartElement = this.chart.nativeElement;
    const createdChart = createChart(chartElement, { width: 400, height: 300 });

    const lineSeries = createdChart.addLineSeries();
    lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
    ]);
    createdChart.timeScale().fitContent();
  }
}
