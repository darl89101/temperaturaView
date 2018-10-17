import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(ajustes: SettingsService) {
    ajustes.aplicarTema();
  }

  ngOnInit() {
  }

}