import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  imagenHospital: string = '';

  constructor(private serviceHospital: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.routerActive.params.subscribe(
      params => {
        if (params.id !== 'nuevo') {
          this.consultarMedico(params.id);
        }
      }
    );

    this.serviceHospital.cargarHospitales(0)
      .subscribe(
        (res: any) => this.hospitales = res.hospitales
      );

      this.modalUploadService.notificacion.subscribe(
        res => {
          // this.consultarMedico(this.medico._id);
          this.medico.img = res.medico.img;
        }
      );
  }

  consultarMedico(id: string) {
    this.medicoService.consultarMedico(id)
      .subscribe(medico => {
        this.medico = medico;
        this.imagenHospital = medico.hospital.img;
        this.medico.hospital = medico.hospital._id;
      });
  }

  guardarMedico(forma: NgForm) {
    if (!forma.valid) {
      return;
    }
    this.medicoService.guardarMedico(this.medico)
      .subscribe(medico => {
        console.log(medico);
        this.medico = medico;
        this.router.navigate(['/medico', medico._id]);
      });
  }

  seleccionarHospital(id: string) {
    if (id.length === 0) {
      return;
    }
    this.serviceHospital.consultarHospital(id)
      .subscribe((res: Hospital) => {
        this.imagenHospital = res.img;
      });
  }

  carbiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
