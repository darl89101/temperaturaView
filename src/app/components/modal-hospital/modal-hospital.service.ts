import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalHospitalService {

  oculto: string = 'oculto';
  notificaciones = new EventEmitter<any>();

  constructor() { }

  abrirModal() {
    this.oculto = '';
  }

  cerrarModal() {
    this.oculto = 'oculto';
  }
}
