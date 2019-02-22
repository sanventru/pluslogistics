import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of as observableOf, Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiurl = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }

  get_ottareas(): Observable<any> {
    return this.http.get(this.apiurl + 'get_ottareas');
  }

  post_ot(datos): Observable<any> {
    return this.http.post(this.apiurl + 'post_ot', datos);
  }

  put_ot(datos): Observable<any> {
    return this.http.put(this.apiurl + 'put_ot', datos);
  }

  getsecuencia(marca): Observable<any> {
    return this.http.get(this.apiurl + 'getsecuencia/' + marca);
  }

  getnovedades(): Observable<any> {
    return this.http.get(this.apiurl + 'getnovedades');
  }

  getnovedadeschasis(chasis): Observable<any> {
    return this.http.get(this.apiurl + 'getnovedadeschasis/' + chasis);
  }

  postmantenimientos(datos): Observable<any> {
    return this.http.post(this.apiurl + 'postmantenimientos', datos);
  }

  getdatachasis(chasis): Observable<any> {
    return this.http.get(this.apiurl + 'getdatachasis/' + chasis );
  }

  getmantenimientos(datos): Observable<any> {
    return this.http.post(this.apiurl + 'getmantenimientos', datos);
  }

  get_ot(estado): Observable<any> {
    return this.http.get(this.apiurl + 'get_ot/' + estado);
  }
}
