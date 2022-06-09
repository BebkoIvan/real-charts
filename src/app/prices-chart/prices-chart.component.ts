import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from '../models/ChartOptions.type';
import { DataChunk } from '../models/iDataChunk';

@Component({
  selector: 'app-prices-chart',
  templateUrl: './prices-chart.component.html',
  styleUrls: ['./prices-chart.component.scss']
})
export class PricesChartComponent implements OnInit {

  chartOptions: Partial<ChartOptions>;
  
  @Input() data: DataChunk[];

  constructor() { }

  ngOnInit(): void {
    this.composeChartOptions();
  }

  composeChartOptions() {
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
          data: this.data.map(el => el.maxValue)
        },
        {
          name: 'Mediana',
          data: this.data.map(el => el.mediana)
        },
        {
          name: 'Min Value',
          data: this.data.map(el => el.minValue)
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
        categories: this.data.map(el => el.date)
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
  }

}
