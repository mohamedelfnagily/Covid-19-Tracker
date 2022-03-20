import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable , BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    //to check on the local storage with every refresh done with the user and if the user token is not null so user data will be kept stored in userData property
      if(localStorage.getItem('userToken') != null){
        this.setUserData();
      }
   }
  //property in order to subscribe on user token stored in the local storage to get user data and to check if the user is logged in or not
  userData:BehaviorSubject<any> = new BehaviorSubject(null);
  
  //getting user token and decoding it to get the data of the user
  setUserData()
  {
    let userToken = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(userToken));

  }

  //logining in by using "https://route-egypt-api.herokuapp.com" API
  login(loginData:object):Observable<any>
  {
    return this._HttpClient.post( `https://route-egypt-api.herokuapp.com/signin` , loginData);
  };

  //regestring for a new user
  register(registerData:object):Observable<any>
  {
    return this._HttpClient.post( `https://route-egypt-api.herokuapp.com/signup` , registerData);
  };


  //logging out and navigating to login page
  logOut()
  {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
