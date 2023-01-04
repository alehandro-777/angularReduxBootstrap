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

  getRange(url:string, from: string, to:string): Observable<OpDataPacket> {
    return this.http.get<OpDataPacket>(environment.apiBaseUrl + `${url}?from=${from}&to=${to}`, { withCredentials: true });
  }

  getExcel(objects:number[], parameters:number[], from: string, to:string) : Observable<any> { 
    let obj = JSON.stringify(objects);
    let params = JSON.stringify(parameters);
        
    return this.http.get(`${environment.apiBaseUrl}/excell?from=${from}&to=${to}&objects=${obj}&parameters=${params}`, 
      { responseType:'blob' as 'json', observe: 'response', withCredentials: true} );
  }
}