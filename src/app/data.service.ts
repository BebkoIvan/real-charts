import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataChunk } from './models/iDataChunk';
import { Cities } from './models/Cities.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
  }

  getData(city: Cities): Observable<DataChunk[]> {
    return this.http.get<DataChunk[]>(`assets/cities-data/${city}.json`);
  }
}

