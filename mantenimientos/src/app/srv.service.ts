import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of as observableOf, Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SrvService {
  private apiurl = 'http://190.110.196.148:8000/'; //'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  postmantenimientos(datos): Observable<any> {
    return this.http.post(this.apiurl + 'postmantenimientos', datos);
  }

  getdatachasis(chasis): Observable<any> {
    return this.http.get(this.apiurl + 'getdatachasis/' + chasis );
  }

  getmantenimientos(datos): Observable<any> {
    return this.http.post(this.apiurl + 'getmantenimientos', datos);
  }
}
