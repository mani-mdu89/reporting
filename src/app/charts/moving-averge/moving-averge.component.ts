import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { createChart } from 'lightweight-charts';
import { ChartDataService } from '../services/chartData.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moving-averge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moving-averge.component.html',
  styleUrl: './moving-averge.component.css'
})
export class MovingAvergeComponent implements OnInit {
  @ViewChild('MovingChart', { static: true })
  chart: any | ElementRef;

  name = 'Chart';
  private createdChart: any;
  private barData: any;
  private maSeries: any
  public lineSeriesArray: any[] = [];

  constructor(private chartData: ChartDataService) { }
  ngOnInit() {
    const chartElement = this.chart.nativeElement;
    this.createdChart = createChart(chartElement, {
      width: 500,
      height: 400,
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true,
      },
    });


    this.barData = this.chartData.generateCandleData(500);

    const candlestickSeries = this.createdChart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    candlestickSeries.setData(this.barData);

    const datesForMarkers = [this.barData[this.barData.length - 39], this.barData[this.barData.length - 19]];
    let indexOfMinPrice = 0;
    for (let i = 1; i < datesForMarkers.length; i++) {
      if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
        indexOfMinPrice = i;
      }
    }

    const markers: any = [
      {
        time: this.barData[this.barData.length - 48].time,
        position: 'aboveBar',
        color: '#f68410',
        shape: 'circle',
        text: 'D',
      },
    ];
    for (let i = 0; i < datesForMarkers.length; i++) {
      if (i !== indexOfMinPrice) {
        markers.push({
          time: datesForMarkers[i].time,
          position: 'aboveBar',
          color: '#e91e63',
          shape: 'arrowDown',
          text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2),
        });
      } else {
        markers.push({
          time: datesForMarkers[i].time,
          position: 'belowBar',
          color: '#2196F3',
          shape: 'arrowUp',
          text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2),
        });
      }
    }
    candlestickSeries.setMarkers(markers);
    this.createdChart.timeScale().fitContent();
  }

  public addLineSeries() {
    const maData = this.chartData.calculateMovingAverageSeriesData(this.barData, 20 * (this.lineSeriesArray.length + 1));
    const lineSeries = this.createdChart.addLineSeries({ color: this.getRandomColor(), lineWidth: 5 });
    lineSeries.setData(maData);
    this.lineSeriesArray.push(lineSeries);
  }

  public removeLineSeries(index: number) {
    if (index >= 0 && index < this.lineSeriesArray.length) {
      this.createdChart.removeSeries(this.lineSeriesArray[index]);
      this.lineSeriesArray.splice(index, 1); // Remove the line series from the array
    }
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
