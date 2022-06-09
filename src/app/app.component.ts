import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from './data.service';
import { Cities } from './models/Cities.type';
import { DataChunk } from './models/iDataChunk';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'Title';
  dataIsLoaded = false;
  onDestroy$ = new Subject();
  data: DataChunk[] = [];
  currentCity = Cities.Kyiv;
  items = Object.values(Cities);

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.fetchData(this.items[0]);
  }

  fetchData(city: Cities) {
    this.dataIsLoaded = false;
    this.dataService.getData(city).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
      (data: DataChunk[]) => {
        this.data = data;
        this.dataIsLoaded = true;
      });
  }

  onCityChange(newCity: Cities) {
    this.fetchData(newCity);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}

