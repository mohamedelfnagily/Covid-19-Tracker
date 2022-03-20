import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { CovidService } from 'src/app/Services/covid.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _CovidService:CovidService) { }

  myMap:any ;
  lat:number = 51.233334;
  long:number = 6.783333;
  affectedCountries:string[] = [];
  countryData:any[] = [];
  searchError:string = '';
  newCases:string = '0';
  activeCases:string = '0';
  criticalCases:string = '0';
  deathCases:string = '0';
  countryPopulation:string = '0';
  recoveredCases:string = '0';
  totalCases:String = '0';
  selectedCountry:string = '';
  totalCasesArray:number[] = [];
  datesArray:string[] = ["2021-01-01","2021-02-01","2021-03-01","2021-04-01","2021-05-01","2021-06-01","2021-07-01","2021-08-01","2021-09-01","2021-10-01","2021-11-01","2021-12-01",]
  nameOfCountry:string = '';
  countryFlag:string = '';
  newsImages:any[] = ['../../../assets/images/images (4).jpg','../../../assets/images/images (6).jpg','../../../assets/images/images (7).jpg' ,'../../../assets/images/images (1).jpg' , '../../../assets/images/images (2).jpg' , '../../../assets/images/images (3).jpg', '../../../assets/images/images.jpg'];
  ngOnInit(): void {
    //setting all affected countries to the array in order to be shown in the view
    this._CovidService.getAffectedCountries().subscribe(
      (resp)=>{this.affectedCountries = resp.response}
    );
  }
  //generating owl carousel elemnt in home component
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  //intiating new formGroup in order to activate search
  searchForm:FormGroup = new FormGroup({
    countryChars:new FormControl(null , [Validators.minLength(3)])
  });

  //getting all the data of the selected country and set marker latitude and longitude
  //then setting the country statistics
  getCountry(countryName:string)
  {

    this.totalCasesArray = [];
    this.selectedCountry = countryName;
    //getting the 12 months data for the selected country which will be sent to the chart
    this._CovidService.getAllData(countryName).subscribe(
      (resp)=>{
        let arr:Array<any> = [];
        let data:Array<any> = resp.response;
        
        data.forEach((a)=>{
          let date:string = a['time'];
          if(date.startsWith('2021'))
          {
            arr.push(a);
          }
        })
        arr.forEach((a,index)=>{
          if(index%30 == 0)
          {
            let numberOFCases:number = Number(a['cases'].total);
            this.totalCasesArray.push(numberOFCases);
            
          }
        })
      }
    );
      //setting latest country statistics
    this._CovidService.getCountryDetails(countryName).subscribe(
      (resp)=>{
        this.setAltitudes(resp.parameters['country']);
        this.activeCases = resp.response[0]['cases'].active;
        this.newCases = resp.response[0]['cases'].new;
        if(this.newCases == null)
        {
          this.newCases = '0';
        }
        this.criticalCases = resp.response[0]['cases'].critical;
        this.recoveredCases = resp.response[0]['cases'].recovered;
        this.totalCases = resp.response[0]['cases'].total;
        this.deathCases = resp.response[0]['deaths'].total;
        this.countryPopulation = resp.response[0]['population'];
      }
    );

    //showing data in map while loading
    $(".box").fadeIn(500 , ()=>{
      setTimeout(()=>{
        $(".box").fadeOut();
        
      } , 1000)
    });
    this.nameOfCountry = '';
    this.countryFlag = '';
  }
  
  //getting countries by search
  getCountryBySearch(countryForm:FormGroup)
  {
    if(countryForm.value['countryChars'].length >= 3)
    {
      this._CovidService.getCountryBySearch(countryForm.value['countryChars']).subscribe(
        (resp)=>{
          this.affectedCountries = resp.response;
          this.checkSearch();
        }
      );

    }
    else
    {
      this._CovidService.getAffectedCountries().subscribe(
        (resp)=>{
          this.affectedCountries = resp.response;
          this.checkSearch();
        }
      );
    }
  }

  //checking the search status
  checkSearch()
  {
    
    if(this.affectedCountries.length != 0)
    {
      (<HTMLElement>document.getElementById('countryContainer')).style.overflowY='auto';
      this.searchError = '';
    }
    else
    {
      (<HTMLElement>document.getElementById('countryContainer')).style.overflowY='hidden';
      this.searchError = 'NotFound , Please enter descriptive enteries';
    }
  }

  //set the marker latitude and longitude of the selected country
  setAltitudes(countryName:string)
  {
    this.nameOfCountry = countryName;
    this._CovidService.getFlag(countryName).subscribe(
      (resp)=>{this.countryFlag = resp[0]['flags'].png}
    );
    this._CovidService.getLocation(countryName).subscribe(
      (resp)=>{
        this.lat = Number(resp.results[0]['location'].lat);
        this.long = Number(resp.results[0]['location'].lng);
      }
    );
  }

  



}
