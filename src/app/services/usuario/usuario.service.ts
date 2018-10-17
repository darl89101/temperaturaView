import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { map, catchError } from 'rxjs/operators';
import { throwError, of, Observable, from } from 'rxjs';

@Injectable()
export class UsuarioService {

  URL_USUARIO = URL_SERVICIOS + '/usuario';
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(private http: HttpClient,
    private router: Router,
    public _subirArchivoService: SubirArchivoService) {
    this.loadStorage();
  }

  renuevaToken() {
    return this.http.get(URL_SERVICIOS + `/login/renuevaToken?token=${this.token}`)
      .pipe(
        map((res: any) => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          console.log('token actualizado');
          return true;
        }),
        catchError((error: any): Observable<any> => {
          this.logout();
          swal('No se pudo renovar el token', 'No fue posible renovar token', 'error');
          return throwError(error);
        })
      );
  }

  isAuthenticated(): boolean {
    if (!this.token || this.token === '') {
      this.loadStorage(); // esto es porque pasa algo raro con el login por google
    }
    return (this.token.length > 5);
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(this.URL_USUARIO, usuario)
    .pipe(
      map((res: any) => {
        swal('Usuario creado con éxito', res.usuario.email, 'success');
        return res.usuario;
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    return this.http.post(URL_SERVICIOS + '/login', usuario)
      .pipe(
        map((res: any) => {
          this.guardarDatosLogin(res.id, res.token, res.usuario, res.menu, recordar);
          return true;
        }),
        catchError(this.handleError())
        // catchError((err: any) => {
        //   console.log(of(`I caught: ${err}`));
        //   // return of(`I caught: ${err}`);
        //   return Observable.throw(err);
        // })
      );
  }

  private handleError<T>() {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure

      // console.error('authentication.service.handleError', error); // log to console instead

      // Let the app keep running by returning an empty result.
      // return from(result);
      // return throwError(from(error));
      return throwError(of(error));
    };
  }

  googleLogin(token: string) {
    return this.http.post(URL_SERVICIOS + '/login/google', { token })
      .pipe(
        map((res: any) => {
          this.guardarDatosLogin(res.id, res.token, res.usuario, res.menu);
          return true;
        })
      );
  }

  guardarDatosLogin(id: string, token: string, usuario: Usuario, menu: any[], recordar: boolean = false) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(this.URL_USUARIO + '/' + usuario._id + '?token=' + this.token, usuario)
      .pipe(
        map((res: any) => {
          if (usuario._id === this.usuario._id) {
            this.guardarDatosLogin(res.usuario._id, this.token, res.usuario, res.menu, localStorage.getItem('email') !== undefined);
          }
          swal('Importante', 'usuario actualizado correctamente', 'success');
          return res;
        })
      );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuario.img;
        this.guardarDatosLogin(id, this.token, this.usuario, this.menu, localStorage.getItem('email') !== undefined);
        swal('Imagen actualizada', this.usuario.nombre, 'success');
      })
      .catch(err => {
        console.log(err);
      });
  }

  cargarUsuarios(desde: number = 0) {
    return this.http.get(this.URL_USUARIO + `?desde=${desde}`);
  }

  buscarUsuarios(termino: string) {
    return this.http.get(URL_SERVICIOS + `/busqueda/coleccion/usuarios/${termino}`);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(this.URL_USUARIO + `/${id}?token=${this.token}`)
    .pipe(
      map(
        res => swal('Correcto', `El usuario ha sido eliminado`, 'success')
      )
    );
  }

}