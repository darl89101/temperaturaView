import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() step: number;
  @Output('result') resultado: EventEmitter<number>;
  @Input()
  progreso: number;
  @Input() leyenda: string = 'Leyenda';
  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  constructor() {
    this.resultado = new EventEmitter<number>();
  }

  ngOnInit() {

  }

  onChange(newValue: number) {
    if (newValue > 100) {
      this.progreso = 100;
    } else if (newValue < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgreso.nativeElement.value = this.progreso;

    this.resultado.emit(newValue);
  }

  cambiarValor(value: number) {
    if (this.progreso + value > 100 || this.progreso + value < 0) {
      return;
    }
    this.progreso += value;
    this.resultado.emit(this.progreso);
  }

}
