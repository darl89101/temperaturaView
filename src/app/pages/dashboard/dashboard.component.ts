import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { TemperaturaService } from '../../services/temperatura/temperatura.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  @ViewChild('d') date1: ElementRef;

  audio = new Audio();
  audioTiempo: any;

  muestra1: number = 0;
  muestra2: number = 0;
  color1: string = 'dodgerblue';
  color2: string = 'dodgerblue';

  picker1: any;
  // @ViewChild('d2')
  picker2: any;

  muestras: number = 20;
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // lineChart
  lineChartData: any[] = [
    { data: [], label: 'Temperatura' },
    { data: [], label: 'Temp Minima', radius: 0 },
    { data: [], label: 'Temp Maxima', radius: 0},
  ];

  lineChartData2: any[] = [
    { data: [], label: 'Temperatura' },
    { data: [], label: 'Temp Minima', radius: 0 },
    { data: [], label: 'Temp Maxima', radius: 0},
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            steps : 10,
            stepValue : 10,
            max : 10,
            min: 0
          }
      }]
    },
    // elements: { point: { radius: 0 } }
  };
  public lineChartColors: any[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      // pointBackgroundColor: 'rgba(148,159,177,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }, { // dark grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(51,51,153,1)',
      // pointBackgroundColor: 'rgba(77,83,96,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(77,83,96,1)'
    }, { // grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(255,0,0,1)',
      // pointBackgroundColor: 'rgba(148,159,177,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor(private service: TemperaturaService, private ref: ChangeDetectorRef) { 
    this.audio.src = 'assets/audio/alarma1.mp3';
    this.audio.load();
  }

  ngOnInit() {
    this.consultarDatos(undefined, undefined);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  aplicarDatos() {
    let date1;
    let date2;
    if (this.picker2) {
      date2 = formatDate(new Date(this.picker2.year, this.picker2.month, this.picker2.day), 'yyyy/MM/dd', 'en-US');
    }
    if (this.picker1) {
      date1 = formatDate(new Date(this.picker1.year, this.picker1.month, this.picker1.day), 'yyyy/MM/dd', 'en-US');
    }
    this.consultarDatos(date1, date2);
  }

  limpiarDatos() {
    this.picker1 = undefined;
    this.picker2 = undefined;
  }

  consultarDatos(fini: string, ffin: string) {
    this.service.consultarTemperatura(fini, ffin, 1).subscribe(tempData => {
      this.lineChartLabels.length = 0;

      let minimo: number = 9999;
      let maximo: number = 0;
      let _lineChartData: any[] = new Array(3);
      _lineChartData[0] = {data: new Array(tempData.length), label: 'Temperatura'};
      _lineChartData[1] = {data: [], label: 'Minimo'};
      _lineChartData[2] = {data: [], label: 'Maximo'};

      if (tempData.length === 0) {
        this.lineChartData = _lineChartData;
        return;
      }

      for (let i = 0; i < tempData.length; i++) {
        let temp = tempData[tempData.length - 1 - i];
        this.lineChartLabels.push(new Date(temp.createdAt).toLocaleTimeString());
        _lineChartData[0].data[i] = Number(temp.valor);
        if (Number(temp.valor) < minimo) {
          minimo = temp.valor;
        }
        if (Number(temp.valor) > maximo) {
          maximo = temp.valor;
        }
      }
      _lineChartData[1] = {data: new Array(tempData.length), label: 'Minimo'};
      for (let i = 0; i < tempData.length; i++) {
        _lineChartData[1].data[i] = 2; // Number(minimo);
      }
      _lineChartData[2] = {data: new Array(tempData.length), label: 'Maximo'};
      for (let i = 0; i < tempData.length; i++) {
        _lineChartData[2].data[i] = 8; // maximo;
      }
      this.muestra1 = _lineChartData[0].data[_lineChartData[0].data.length - 1];
      if (this.muestra1 >= 8 || this.muestra1 <= 2) {
        this.audio.play();
        this.color1 = 'red';
      } else {
        this.color1 = 'dodgerblue';
      }
      this.lineChartData = _lineChartData;
      this.ref.detectChanges();
    });


    this.service.consultarTemperatura(fini, ffin, 2).subscribe(tempData => {
      this.lineChartLabels.length = 0;

      let minimo: number = 9999;
      let maximo: number = 0;
      let _lineChartData: any[] = new Array(3);
      _lineChartData[0] = {data: new Array(tempData.length), label: 'Temperatura'};
      _lineChartData[1] = {data: [], label: 'Minimo'};
      _lineChartData[2] = {data: [], label: 'Maximo'};

      if (tempData.length === 0) {
        this.lineChartData = _lineChartData;
        return;
      }

      for (let i = 0; i < tempData.length; i++) {
        let temp = tempData[tempData.length - 1 - i];
        this.lineChartLabels.push(new Date(temp.createdAt).toLocaleTimeString());
        _lineChartData[0].data[i] = Number(temp.valor);
        if (Number(temp.valor) < minimo) {
          minimo = temp.valor;
        }
        if (Number(temp.valor) > maximo) {
          maximo = temp.valor;
        }
      }
      _lineChartData[1] = {data: new Array(tempData.length), label: 'Minimo'};
      for (let i = 0; i < tempData.length; i++) {
        _lineChartData[1].data[i] = 2; // Number(minimo);
      }
      _lineChartData[2] = {data: new Array(tempData.length), label: 'Maximo'};
      for (let i = 0; i < tempData.length; i++) {
        _lineChartData[2].data[i] = 8; // maximo;
      }
      this.muestra2 = _lineChartData[0].data[_lineChartData[0].data.length - 1];
      if (this.muestra2 >= 8 || this.muestra2 <= 2) {
        this.audio.play();
        this.color1 = 'red';
      } else {
        this.color1 = 'dodgerblue';
      }
      this.lineChartData2 = _lineChartData;
      this.ref.detectChanges();
    });


    // this.service.consultarTemperatura(fini, ffin).subscribe(tempData => {
    //   this.lineChartLabels.length = 0;

    //   let minimo: number = 9999;
    //   let _lineChartData: any[] = new Array(1);
    //   if (tempData.length === 0) {
    //     _lineChartData[0] = {data: [], label: 'Temperatura'};
    //     this.lineChartData = _lineChartData;
    //     return;
    //   }
    //   _lineChartData = new Array(tempData.length);
    //   for (let i = 0; i < tempData.length; i++) {
    //     _lineChartData[i] = {data: new Array(tempData.length), label: 'Temperatura'};
    //     let temp = tempData[tempData.length - 1 - i];
    //     this.lineChartLabels.push(new Date(temp.createdAt).toLocaleTimeString());
    //     _lineChartData[0].data[i] = Number(temp.valor);
    //     if (temp.valor < minimo) {
    //       minimo = temp.valor;
    //     }
    //   }
    //   let _lineChartDataMinimo: any[] = new Array(2);
    //   _lineChartDataMinimo[0] = {data: new Array(tempData.length), label: 'Tmp minimo'};
    //   this.lineChartData = _lineChartData;
    //   this.ref.detectChanges();
    // });
  }

}
