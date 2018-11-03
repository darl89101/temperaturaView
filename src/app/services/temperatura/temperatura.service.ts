import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable, pipe } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private http: HttpClient) { }

  consultarTemperatura(fini: string, ffin: string) {
    // return this.http.get(URL_SERVICIOS + '/temp');
    // return new Observable(observer => {
    //   setInterval(() => {
    //     this.http.get(URL_SERVICIOS + '/temp').subscribe(res => {
    //       observer.next(res);
    //     });
    //   }, 3000);
    // });
    return new Observable(observer => {
      setInterval(() => {
        this.http.get(URL_SERVICIOS + `/temp?fini=${fini}&ffin=${ffin}`).subscribe(res => {
          observer.next(res);
        });
      }, 1000);
    }).pipe(
      map((res: any) => {
        return res.temperaturas;
      })
    );

  }

  consultarTemperaturaByDate(fini: string, ffin: string, limit: number) {
    return this.http.get(URL_SERVICIOS + `/temp?fini=${fini}&ffin=${ffin}&limit=${limit}`)
    .pipe(
      map((res: any) => {
        return res.temperaturas;
      })
    );

  }

}
