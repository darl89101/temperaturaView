import { Component, OnInit } from '@angular/core';
import { TemperaturaService } from '../../services/temperatura/temperatura.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

// lineChart
  lineChartData: any[] = [
    { data: [], label: 'Temperatura' }
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];

  public lineChartLabels: any[] = ['Enero'];
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

  constructor(private service: TemperaturaService) { }

  ngOnInit() {
    this.service.consultarTemperatura().subscribe(tempData => {
      // console.log(tempData);


      let _lineChartLabels: any[] = new Array(tempData.length);
      let _lineChartData: any[] = new Array(tempData.length);
      for (let i = 0; i < tempData.length; i++) {
        _lineChartData[i] = {data: new Array(tempData.length), label: this.lineChartData[0].label};

        for (let j = 0; j < tempData.length; j++) {
          let temp = tempData[tempData.length - 1 - j];
          _lineChartLabels[j] = j + ''; // temp.createdAt);
          _lineChartData[i].data[j] = Number(temp.valor); // Math.floor((Math.random() * 100) + 1);
        }
        // for (let j = tempData.length - 1; j >= 0; j--) {
        //   let temp = tempData[j];
        //   _lineChartData[i].data[j] = Number(temp.valor); // Math.floor((Math.random() * 100) + 1);
        // }
      }
      this.lineChartLabels = _lineChartLabels;
      this.lineChartData = _lineChartData;
      console.log(this.lineChartLabels);
    });
  }

  public randomize(): void {
    let _lineChartData: any[] = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
