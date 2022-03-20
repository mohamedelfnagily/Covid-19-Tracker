import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit  , OnChanges{
  myMap:any ;
  @Input() latitude:number = 51.233334;
  @Input() longitude:number = 6.783333;
  constructor() { }
  //map is initiated in ngOnChanges because latitude and longitude values will be changed when the user select a country
  //map component is considered as a child to tha home component
  ngOnChanges(changes: SimpleChanges): void {
    let loader = new Loader({
      apiKey:'AIzaSyAEKJa_KLWTF2G-EVhScPTITDAhfPqZOuE'
    })
    loader.load().then(()=>{
      this.myMap  = document.getElementById("map") as HTMLElement;
       let map = new google.maps.Map(this.myMap,{
         center:{lat:this.latitude , lng:this.longitude},
         zoom:6
       })
       
       const marker = new google.maps.Marker({
        position:{lat:this.latitude , lng:this.longitude},
        map:map,
        draggable:true,
        title:"Drag me!"
      })

 

    })
  }

  ngOnInit(): void {

  }

}
