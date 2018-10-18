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

  picker1: any;
  // @ViewChild('d2')
  picker2: any;

  muestras: number = 20;
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // lineChart
  lineChartData: any[] = [
    { data: [], label: 'Temperatura' }
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: any[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    // ,
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];

  constructor(private service: TemperaturaService, private ref: ChangeDetectorRef) { }

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
    this.service.consultarTemperatura(fini, ffin).subscribe(tempData => {

      console.log('dataaa', tempData.length);

      this.lineChartLabels.length = 0;
      let _lineChartData: any[] = new Array(tempData.length);
      for (let i = 0; i < tempData.length; i++) {

        _lineChartData[i] = {data: new Array(tempData.length), label: 'Temperatura'};
        let temp = tempData[tempData.length - 1 - i];
        this.lineChartLabels.push(new Date(temp.createdAt).toLocaleTimeString());
        _lineChartData[0].data[i] = Number(temp.valor);
      }
      this.lineChartData = _lineChartData;
      this.ref.detectChanges();
    });
  }

}
