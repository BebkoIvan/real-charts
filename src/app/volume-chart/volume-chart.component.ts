import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from '../models/ChartOptions.type';
import { DataChunk } from '../models/iDataChunk';

@Component({
  selector: 'app-volume-chart',
  templateUrl: './volume-chart.component.html',
  styleUrls: ['./volume-chart.component.scss']
})
export class VolumeChartComponent implements OnInit {

  @Input() data: DataChunk[];
  volumeCharOptions: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    this.composeChartOptions();
  }

  composeChartOptions() {
    this.volumeCharOptions = {
      title: {
        text: 'Volume'
      },
      series: [
        {
          name: '01k Alpha',
          data: this.data.map(el => el.volume)
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
        categories: this.data.map(el => el.date),
        labels: {
          style: {
            colors: ['#FFA500'],
            fontSize: '12px'
          }
        }
      }
    };
  }

}
