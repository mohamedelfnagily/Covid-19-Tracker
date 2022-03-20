import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }
  isLoggedIn:boolean = false;
  ngOnInit(): void {
    //checking on the user data inorder to control the appearance of login and register buttons in the sidebar
    this._AuthService.userData.subscribe(
      ()=>{
        if(this._AuthService.userData.getValue() != null){
          this.isLoggedIn = true;
        }
        else{
          this.isLoggedIn = false;
        }
      }
    );
    
  }


  //logging out, removing user token, setting user data and navigating to login page
  //(logic is handeled in the authentication service)
  loggingOut(){
    this._AuthService.logOut();
    
  }
  showSideBar()
  {
    
    let popUpWidth = $(".sideBar").width();
    $(".sideBar").toggle(500);
    let sideBarOpacity = $(".sideBar").css("opacity")
    if(sideBarOpacity > 0.1)
    {
      console.log($(".sideBar").css('opacity'))
      $("#myBtn").animate({ left:`0px`} , 500);
      
    }
    else{
      $(".sideBar").css('opacity')
      $("#myBtn").animate({ left:`${popUpWidth}px`} , 500);
    }
    
  }

}
