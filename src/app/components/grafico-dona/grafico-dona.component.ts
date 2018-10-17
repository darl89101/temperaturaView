import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input('labels')
  public doughnutChartLabels: string[] = [];
  @Input('data')
  public doughnutChartData: number[] = [];
  @Input('chartType')
  public doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
