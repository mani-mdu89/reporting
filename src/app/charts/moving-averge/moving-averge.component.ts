import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { createChart } from 'lightweight-charts'; 
import { ChartDataService } from '../services/chartData.service';

@Component({
  selector: 'app-moving-averge',
  standalone: true,
  imports: [],
  templateUrl: './moving-averge.component.html',
  styleUrl: './moving-averge.component.css'
})
export class MovingAvergeComponent implements OnInit{
  @ViewChild('MovingChart', {static: true})
  chart: any| ElementRef;
  
  name = 'Chart';

  constructor( private chartData: ChartDataService ) {}
  ngOnInit() {
    const chartElement = this.chart.nativeElement;
    const createdChart = createChart(chartElement, { 
      width: 500,
      height: 400,
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true,
    },
    });

    
    const barData = this.chartData.generateCandleData(500);
    const maData = this.chartData.calculateMovingAverageSeriesData(barData, 20);
    const maSeries = createdChart.addLineSeries({ color: '#2962FF', lineWidth: 1 });
    maSeries.setData(maData);

    const candlestickSeries = createdChart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
    });
    candlestickSeries.setData(barData);

    // const candlestickSeries = createdChart.addCandlestickSeries();
    // const data: any = [
    //   { time: '2018-06-25T09:15:00.000Z', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    //   { time: '2018-06-25T09:20:00.000Z', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    //   { time: '2018-06-25T09:25:00.000Z', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    //   { time: '2018-06-25T09:30:00.000Z', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
    //   { time: '2018-06-25T09:35:00.000Z', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    //   { time: '2018-06-25T09:40:00.000Z', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
    //   { time: '2018-06-25T09:45:00.000Z', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
    //   { time: '2018-06-25T09:50:00.000Z', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
    //   { time: '2018-06-25T09:55:00.000Z', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
    //   { time: '2018-06-25T10:00:00.000Z', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    // ].map((d) => {
    //   return { ...d, time: new Date(d.time).valueOf() / 1000 };
    // });
    // candlestickSeries.setData(data);

    createdChart.timeScale().fitContent();
  }
}
