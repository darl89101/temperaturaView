import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable()
export class HospitalService {

  URL_HOSPITALES: string = URL_SERVICIOS + '/hospital';
  token: string;

  constructor(public http: HttpClient,
    public userService: UsuarioService) {
      this.token = this.userService.token;
    }

  cargarHospitales(desde: number) {
    return this.http.get(this.URL_HOSPITALES + `?desde=${desde}`);
  }

  consultarHospital(id: string) {
    return this.http.get(this.URL_HOSPITALES + `/${id}`)
      .pipe(
        map((res: any) => res.hospital)
      );
  }

  obtenerHospital(id: string) {
    return this.http.get(this.URL_HOSPITALES + `/${id}`);
  }

  borrarHospital(id: string) {
    return this.http.delete(this.URL_HOSPITALES + `/${id}?token=${this.token}`)
      .pipe(
        map(
          res => swal('Correcto', `El hospital ha sido eliminado`, 'success')
        )
      );
  }

  crearHospital(hospital: Hospital) {
    return this.http.post(this.URL_HOSPITALES + `?token=${this.token}`, hospital)
    .pipe(
      map(
        res => {
          swal('Hospital creado con éxito', hospital.nombre, 'success');
          return true;
        }
      )
    );
  }

  buscarHospital(termino: string) {
    return this.http.get(URL_SERVICIOS + `/busqueda/coleccion/hospitales/${termino}`)
      .pipe(
        map(
          (res: any) => res.hospitales
        )
      );
  }

  actualizarHospital(hospital: Hospital) {
    return this.http.put(this.URL_HOSPITALES + `/${hospital._id}?token=${this.token}`, hospital)
      .pipe(
        map(
          res => {
            swal('Hospital actualizado con éxito', hospital.nombre, 'success');
            return res;
          }
        )
      );
  }
}
