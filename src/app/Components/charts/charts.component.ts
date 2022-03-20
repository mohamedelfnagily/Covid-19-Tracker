import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Chart , registerables } from 'chart.js';
Chart.register(...registerables);
declare var $:any;
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit , OnChanges {

  constructor() { }
  @Input() countryName:string = '';
  @Input() totalCases:number[] = [];
  chart!:Chart;
  

  ngOnChanges(changes: SimpleChanges): void {

    setTimeout(() => {
      this.updateChart(this.chart , this.countryName , this.totalCases)
    }, 2000);
    
  }

  ngOnInit(): void {
    const ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
    this.chart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June' , 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: 'sdsdsd',
              data: [100 ,200,300,400,500,600,700,800,900,1000,1100,1200],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'

              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              
              y: {
                  beginAtZero: true
                  
                  
              }
          },
          responsive:true,
          
      }
  });



  }
  updateChart(char:Chart,x:string , y:number[])
  {
    char.data.datasets[0].label = x;
    for(let i =0;i<=y.length;i++)
    {
      char.data.datasets[0].data[i] = y[i];
    }
    char.update();
  }


}
