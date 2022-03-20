import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { FaqComponent } from './Components/faq/faq.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { PreventionComponent } from './Components/prevention/prevention.component';

import { RegisterComponent } from './Components/register/register.component';
import { SymptomsComponent } from './Components/symptoms/symptoms.component';
import { TreatmentComponent } from './Components/treatment/treatment.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home' ,canActivate:[AuthGuard] , component:HomeComponent},
  {path:'about',canActivate:[AuthGuard]  , component:AboutComponent},
  {path:'symptoms' ,canActivate:[AuthGuard] , component:SymptomsComponent},
  {path:'prevention',canActivate:[AuthGuard]  , component:PreventionComponent},
  {path:'treatment',canActivate:[AuthGuard]  , component:TreatmentComponent},
  {path:'faq' ,canActivate:[AuthGuard] , component:FaqComponent},
  {path:'login'  , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'**' , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
