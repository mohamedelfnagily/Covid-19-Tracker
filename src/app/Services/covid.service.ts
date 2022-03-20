import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICasestudy } from './../Interfaces/icasestudy';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private _HttpClient:HttpClient) { }
  //header object send with each http request
  covidHeader:object = {headers:{
    'x-rapidapi-host':'covid-193.p.rapidapi.com',
    'x-rapidapi-key': 'c754539ecbmsh37f7eec485e72d7p1e34c4jsn8533c4c6c3bf'
  }};
  geocodingHeader:object = {headers:{
    'x-rapidapi-host':'trueway-geocoding.p.rapidapi.com',
    'x-rapidapi-key': 'c754539ecbmsh37f7eec485e72d7p1e34c4jsn8533c4c6c3bf'
  }};

  //getting all countries affected by the Coronavirus.
  getAffectedCountries():Observable<any>
  {
    return this._HttpClient.get('https://covid-193.p.rapidapi.com/countries' , this.covidHeader )
  }
  
  //getting specific country statistics depending on the country name passes as an argument
  getCountryDetails(countryName:string):Observable<any>
  {
    return this._HttpClient.get(`https://covid-193.p.rapidapi.com/statistics?country=${countryName}` , this.covidHeader)
  }

  //getting countries by search
  getCountryBySearch(characters:string):Observable<any>
  {
    return this._HttpClient.get(`https://covid-193.p.rapidapi.com/countries?search=${characters}` , this.covidHeader)
  }
  //getting longitude and latitude of the selected country
  //using "https://trueway-geocoding.p.rapidapi.com" API
  getLocation(countryName:string):Observable<any>
  {
    return this._HttpClient.get(`https://trueway-geocoding.p.rapidapi.com/Geocode?address=${countryName}&language=en` , this.geocodingHeader)
  }

  //getting the selected country flag 
  //using "https://restcountries.com/v2/name/china?fullText=true" API
  getFlag(countryName:string):Observable<any>
  {
    return this._HttpClient.get(`https://restcountries.com/v2/name/${countryName}?fullText=true`);
  }

  //getting the selected country statistics depending on the date
  getCountryStatistics(countryName:string , date:string):Observable<any>
  {
    return this._HttpClient.get(`https://covid-193.p.rapidapi.com/history?country=${countryName}&day=${date}` , this.covidHeader)
  }

  //getting all data for the selected country(whole year)
  getAllData(countryName:string):Observable<any>
  {
    return this._HttpClient.get(`https://covid-193.p.rapidapi.com/history?country=${countryName}` , this.covidHeader);
  }

  //getting statistics of all the countries to be showed in the line chart
  getAllCountryStats():Observable<any>
  {
    return this._HttpClient.get(`https://covid-193.p.rapidapi.com/history?country=all` , this.covidHeader);
  }
}
