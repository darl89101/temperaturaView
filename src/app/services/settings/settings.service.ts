import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  private ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {

  }

  guardarAjustes(ajustes: Ajustes) {
    this.ajustes = ajustes;
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(): Ajustes {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    return this.ajustes;
  }

  aplicarTema(tema: string = '') {
    if (tema === '') {
      this.cargarAjustes();
    } else {
      const url = `assets/css/colors/${tema}.css`;
      this.guardarAjustes({
        tema: tema,
        temaUrl: url
      });
    }
    this._document.getElementById('tema').setAttribute('href', this.ajustes.temaUrl);
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
