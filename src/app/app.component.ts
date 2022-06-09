import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexPlotOptions,
  ApexYAxis,
  ApexTooltip,
  ApexLegend,
  ApexDataLabels,
} from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DataChunk, DataService } from './data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  legend: ApexLegend;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  colors: string[];
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Title';
  dataIsLoaded = false;
  onDestroy$ = new Subject();

  @ViewChild('chart') chart: ChartComponent;
  
  chartOptions: Partial<ChartOptions>;
  volumeCharOptions: Partial<ChartOptions>;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getData().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
      (data: DataChunk[]) => {
        const dates = data.map(el => el.date);
        this.chartOptions = {
          chart: {
            height: 350,
            type: 'line',
            stacked: false
          },
          colors: ['#FF1654', '#247BA0', '#FFA500'],
          series: [
            {
              name: 'Max Value',
              data: data.map(el => el.maxValue)
            },
            {
              name: 'Mediana',
              data: data.map(el => el.mediana)
            },
            {
              name: 'Min Value',
              data: data.map(el => el.minValue)
            },
          ],
          stroke: {
            width: [4, 4, 4]
          },
          plotOptions: {
            bar: {
              columnWidth: '20%'
            }
          },
          xaxis: {
            categories: dates
          },
          yaxis: [
            {
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: '#FF1654'
              },
              labels: {
                style: {
                  colors: '#FF1654'
                }
              },
              // title: {
              //   text: 'Series A',
              //   style: {
              //     color: '#FF1654'
              //   }
              // }
            },
            // {
            //   opposite: true,
            //   axisTicks: {
            //     show: true
            //   },
            //   axisBorder: {
            //     show: true,
            //     color: '#247BA0'
            //   },
            //   labels: {
            //     style: {
            //       colors: '#247BA0'
            //     }
            //   },
            //   // title: {
            //   //   text: 'Series B',
            //   //   style: {
            //   //     color: '#247BA0'
            //   //   }
            //   // }
            // }
          ],
          title: {
            text: 'Prices'
          },
          tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40
          }
        };
        this.volumeCharOptions = {
          title: {
            text: 'Volume'
          },
          series: [
            {
              data: data.map(el => el.volume)
            }
            ],
          chart: {
            height: 350,
            type: 'bar',
          },
          colors: ['#FFA500'],
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: dates ,
            labels: {
              style: {
                colors: ['#FFA500'],
                fontSize: '12px'
              }
            }
          }
        };
        this.dataIsLoaded = true;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}

