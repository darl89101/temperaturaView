import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http: HttpClient) { }

  consultarParametros() {
    return new Observable(observer => {
      setInterval(() => {
        this.http.get(URL_SERVICIOS + `/parametros`).subscribe(res => {
          observer.next(res);
        });
      }, 1000);
    }).pipe(
      map((res: any) => {
        return res.parametros;
      })
    );
  }
}
