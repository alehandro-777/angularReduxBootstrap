import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TemperaturePacket } from './temperature-map.models';



 
@Injectable({ providedIn: 'root' })
export class TemperatureMapService {
  constructor(private http: HttpClient) {}
 
  get(tsIso: string): Observable<TemperaturePacket> {
    return this.http.get<TemperaturePacket>(environment.apiBaseUrl + `/temperatures?gasday=${tsIso}`, { withCredentials: true });
  }


}