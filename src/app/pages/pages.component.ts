import { Component, OnInit } from '@angular/core';

declare function init_plugins(); // esta funcion se declaro en custom.js para cargar los plugins manualmente
// pues al pasar del login al inicio se crean los componentes y el script ya no los enlaza porque se cargo anteriormente (delegate)

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
