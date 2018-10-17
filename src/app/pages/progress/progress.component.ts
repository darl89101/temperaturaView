import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 0;
  progreso2: number = 10;
  leyenda2: string = 'Barra Progreso 2';

  constructor() { }

  ngOnInit() {
  }

  resultado1(val: number) {
    this.progreso1 = val;
  }

  // cambiarValor(value: number) {
  //   if (this.progreso + value > 100 || this.progreso + value < 0) {
  //     return;
  //   }
  //   this.progreso += value;
  // }

}
