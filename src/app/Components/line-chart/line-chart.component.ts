import { Component,OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Chart , registerables } from 'chart.js';
import { CovidService } from 'src/app/Services/covid.service';
Chart.register(...registerables);
declare var $:any;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  totalCases:number[]=[];
  constructor(private _CovidService:CovidService) { }
  lineChart!:Chart;
  ngOnInit(): void {
    this._CovidService.getAllCountryStats().subscribe(
      (resp)=>{
        let arr:Array<any> = [];
        let data:Array<any> = resp.response;
        
        data.forEach((a,index)=>{
          let date:string = a['time'];
          if(date.startsWith('2021'))
          {
            arr.push(a);
          }
        })
        arr.forEach((a,index)=>{
          if(index%2100 == 0)
          {
            let numberOFCases:number = Number(a['cases'].total);
            this.totalCases.push(numberOFCases);
          }


        })
        this.totalCases.shift();
        this.totalCases.pop()
        var xValues = ['January', 'February', 'March', 'April', 'May', 'June' , 'July', 'August', 'September', 'October', 'November', 'December'];
        var yValues = this.totalCases;
        //generating new line chart depending on the data sent from home component (parent)
        this.lineChart = new Chart("myLineChart", {
          type: "line",
          data: {
            labels: xValues,
            datasets: [{
              label: 'World Wide Number of Cases along 2021',
              backgroundColor: "rgba(0,0,0,1.0)",
              borderColor: "rgba(0,0,0,0.1)",
              data: yValues
            }]
          },
          options:{
            elements: {
                line: {
                    tension: 0, 
                }
            }
        }
        });

      },
      (err)=>{
        var xValues = ['January', 'February', 'March', 'April', 'May', 'June' , 'July', 'August', 'September', 'October', 'November', 'December'];
        var yValues = [0,0,0,0,0,0,0,0,0,0,0,0];
        this.lineChart = new Chart("myLineChart", {
          type: "line",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: "rgba(0,0,0,1.0)",
              borderColor: "rgba(0,0,0,0.1)",
              data: yValues
            }]
          },
          options:{
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            }
        }
        });
      }
    );

  }

}
