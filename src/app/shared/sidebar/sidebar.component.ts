import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: any[] = [];

  constructor(private _service: SidebarService,
    public _userService: UsuarioService) { }

  ngOnInit() {
    this._service.cargarMenu();
    this.menu = this._service.menu;
  }

}
