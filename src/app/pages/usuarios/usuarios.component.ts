import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  loading: boolean = true;

  constructor(public _usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(
      res => this.cargarUsuarios()
    );
  }

  cargarUsuarios() {
    this.loading = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.usuarios = res.usuarios;
          this.totalRegistros = res.total;
        }
      );
  }

  cambiarDesde(incremento: number) {
    if (this.desde + incremento < 0 || this.desde + incremento >= this.totalRegistros) {
      return;
    }
    this.desde += incremento;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.loading = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.usuarios = res.usuarios;
          this.totalRegistros = res.total;
        }
      );
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario.email === this._usuarioService.usuario.email) {
      swal('No puede eliminar usuario', 'No se puede eliminar a sí mismo', 'error');
      return;
    }
    swal({
      title: '¿Estas seguro?',
      text: 'Eliminar usuario',
      icon: 'warning',
      buttons: ['NO', 'SI'],
      dangerMode: true
    }) .then((borrar) => {
      if (borrar) {
        this._usuarioService.eliminarUsuario(usuario._id)
          .subscribe(
            res => {
              this.cargarUsuarios();
            }
          );
      } else {
        // swal('Your imaginary file is safe!');
      }
    });

  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

  mostrarModal(usuario: Usuario) {
    this.modalUploadService.mostrarModal('usuarios', usuario._id);
  }

}
