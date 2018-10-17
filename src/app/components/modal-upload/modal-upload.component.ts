import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  usuario: Usuario = {
    nombre: '',
    email: '',
    password: ':',
    img: ''
  };
  imagenSubir: File;
  imagenTmp: string;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTmp = null;
    this.modalUploadService.ocultarModal();
  }

  guardar(usuario: Usuario) {
    // this.usuario.nombre = usuario.nombre;
    // if (!this.usuario.google) {
    //   this.usuario.email = usuario.email;
    // }
    // this.usuarioService.actualizarUsuario(this.usuario)
    //   .subscribe(res => { });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (!archivo.type.startsWith('image')) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTmp = reader.result.toString();
  }

  cambiarImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
    .then(res => {
      this.modalUploadService.notificacion.emit(res);
      this.cerrarModal();
    })
    .catch(err => {
      console.log('error en la carga de la imagen');
    });
  }

}
