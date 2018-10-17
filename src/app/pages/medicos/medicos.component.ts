import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  loading: boolean = true;
  totalRegistros: number = 0;
  desde: number = 0;

  medicos: Medico[] = [];

  constructor(private serviceMedico: MedicoService) { }

  ngOnInit() {
    this.consultarMedicos();
  }

  consultarMedicos() {
    this.loading = true;
    this.serviceMedico.consultarMedicos(this.desde)
      .subscribe(
        (res: any) => {
          this.medicos = res.medicos;
          this.loading = false;
          this.totalRegistros = res.total;
        }
      );
  }

  buscarMedico(termino: string) {
    if (termino.length === 0) {
      this.consultarMedicos();
      return;
    }
    this.loading = true;
    this.serviceMedico.buscarMedicos(termino)
      .subscribe(
        (res: any) => {
          this.medicos = res;
          this.loading = false;
        }
      );
  }

  mostrarModal() {}

  borrarMedico(medico: Medico) {
    this.serviceMedico.borrarMedico(medico._id)
      .subscribe(() => this.consultarMedicos());
  }

  cambiarDesde(incremento: number) {
    if (this.desde + incremento < 0 || this.desde + incremento >= this.totalRegistros) {
      return;
    }
    this.desde += incremento;
    this.consultarMedicos();
  }
}
