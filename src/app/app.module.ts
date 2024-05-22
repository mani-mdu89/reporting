import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  bootstrap: [
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/