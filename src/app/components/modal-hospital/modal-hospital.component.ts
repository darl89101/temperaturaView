import { Component, OnInit } from '@angular/core';
import { ModalHospitalService } from './modal-hospital.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-modal-hospital',
  templateUrl: './modal-hospital.component.html',
  styleUrls: []
})
export class ModalHospitalComponent implements OnInit {

  nombre: string = '';

  constructor(public modalHospitalService: ModalHospitalService,
    public hospitalService: HospitalService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.nombre = '';
    this.modalHospitalService.cerrarModal();
  }

  guardarHospital() {
    this.hospitalService.crearHospital(new Hospital(this.nombre))
      .subscribe(res => {
        this.modalHospitalService.notificaciones.emit(res);
        this.cerrarModal();
      });
  }
}
