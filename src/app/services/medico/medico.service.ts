import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  token: string = '';

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService) {
      this.token = usuarioService.token;
    }

  consultarMedicos(desde: number) {
    return this.http.get(URL_SERVICIOS + `/medico?desde=${desde}`);
  }

  consultarMedico(id: string) {
    return this.http.get(URL_SERVICIOS + `/medico/${id}`)
      .pipe(
        map(
          (res: any) => res.medico
        )
      );
  }

  buscarMedicos(termino: string) {
    return this.http.get(URL_SERVICIOS + `/busqueda/coleccion/medicos/${termino}`)
      .pipe(
        map(
          (res: any) => res.medicos
        )
      );
  }

  borrarMedico(id: string) {
    return this.http.delete(URL_SERVICIOS + `/medico/${id}?token=${this.token}`)
      .pipe(
        map(
          res => swal('Correcto', `El médico ha sido eliminado`, 'success')
        )
      );
  }

  guardarMedico(medico: Medico) {
    if (medico._id) {
      return this.http.put(URL_SERVICIOS + `/medico/${medico._id}?token=${this.token}`, medico)
      .pipe(
        map(
          (res: any) => {
            swal('Médico Actualizado', medico.nombre, 'success');
            return res.medico;
          }
        )
      );
    } else {
      return this.http.post(URL_SERVICIOS + `/medico?token=${this.token}`, medico)
      .pipe(
        map(
          (res: any) => {
            swal('Médico creado', medico.nombre, 'success');
            return res.medico;
          }
        )
      );
    }
  }

}
