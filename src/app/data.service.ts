import { Injectable } from '@angular/core';
// import * as dataJson  from '../assets/10_days_sample.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  jsonUrl = 'assets/10_days_sample.json';

  constructor(private http: HttpClient) { 
  }

  getData(): Observable<DataChunk[]> {
    return this.http.get<DataChunk[]>(this.jsonUrl);
  }
}

export interface DataChunk {
  date: string;
  maxValue: number;
  mediana: number;
  minValue: number;
  volume: number;
}
