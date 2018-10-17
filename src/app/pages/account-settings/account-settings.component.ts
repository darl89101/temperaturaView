import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document,
      private _ajustes: SettingsService) {
  }

  ngOnInit() {
    const workingEl = document.querySelector(`a[data-theme=\'${this._ajustes.cargarAjustes().tema}\']`);
    workingEl.classList.toggle('working');
  }

  cambiarColor(el: any) {
    const elementWorking = this._document.getElementsByClassName('working');
    if (elementWorking.length > 0) {
      elementWorking[0].classList.toggle('working');
    }
    el.classList.toggle('working');
    this._ajustes.aplicarTema(el.attributes['data-theme'].value);
  }

  // constructor(@Inject(DOCUMENT) private _document) {
  //   const themeAdmin = localStorage.getItem('themeAdmin');
  //   console.log(this._document.getElementsByAttribute('data-theme', themeAdmin));
  //  }

  // ngOnInit() {
  // }

  // cambiarColor(el) {
  //   const elementWorking = this._document.getElementsByClassName('working');
  //   elementWorking[0].classList.toggle('working');
  //   el.srcElement.classList.toggle('working');
  //   const theme = el.srcElement.attributes['data-theme'].value;
  //   console.log(theme);
  //   const url = `assets/css/colors/${theme}.css`;
  //   this._document.getElementById('tema').setAttribute('href', url);
  //   localStorage.setItem('themeAdmin', theme);


  //   // const url = `assets/css/colors/${tema}.css`;
  //   // this._document.getElementById('tema').setAttribute('href', url);
  // }

}
