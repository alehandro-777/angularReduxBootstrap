import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OpDataPacket } from './gas-storage-map.models';


 
@Injectable({ providedIn: 'root' })
export class GasStorageMapService {
  constructor(private http: HttpClient) {}
 
  get(url:string, tsIso: string): Observable<OpDataPacket> {
    return this.http.get<OpDataPacket>(environment.apiBaseUrl + `${url}?gasday=${tsIso}`, { withCredentials: true });
  }


}