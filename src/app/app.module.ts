import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PricesChartComponent } from './prices-chart/prices-chart.component';
import { VolumeChartComponent } from './volume-chart/volume-chart.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';
import { NewsComponent } from './news/news.component';
@NgModule({
  declarations: [
    AppComponent,
    PricesChartComponent,
    VolumeChartComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule,
    NgxSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
