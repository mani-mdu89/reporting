import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { CandleChartComponent } from './charts/candle-chart/candle-chart.component';
import { MovingAvergeComponent } from './charts/moving-averge/moving-averge.component'
import {  TradingviewWidgetModule } from 'angular-tradingview-widget';
import { CommonModule } from '@angular/common';
declare const TradingView: any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LineChartComponent, CandleChartComponent, TradingviewWidgetModule, CommonModule,
    MovingAvergeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  ///public widgetConfig: ITradingViewWidget | any= {};
  public symbol: string = "AAPL"; // The symbol you want to chart
  public interval: string = "1D"; 

  ngOnInit() {
    new TradingView.widget({
      "autosize": true,
      "symbol": 'NASDAQ:AAPL',
      "interval": '1D',
      "container_id": "tradingview-widget-container",
      "datafeed": {
        "timezone": "Etc/UTC",
        "supported_resolutions": ["1D", "1W", "1M"],
        "disable_features": ["left_toolbar", "header_compare", "header_saveload", "header_settings", "header_chart_type", "header_fullscreen_button"]
      },
      "library_path": "assets/charting_library/",
      "custom_css_url": "assets/charting_library/chartiq.css",
      "charts_storage_url": "http://saveload.tradingview.com",
      "charts_storage_api_version": "1.1",
      "client_id": "tradingview.com",
      "user_id": "public_user_id",
      "theme": "Dark",
      "style?":  '5',
      "studies_overrides": {
        "moving average.length": 20,
        "moving average.color": "#FF5733",
        "moving average.plottype": "line"
      }
    });
  }
  


}
