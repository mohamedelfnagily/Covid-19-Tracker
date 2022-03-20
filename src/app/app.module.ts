import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './Components/map/map.component';
import { ChartsComponent } from './Components/charts/charts.component';
import {CarouselModule} from 'ngx-owl-carousel-o'
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { AboutComponent } from './Components/about/about.component';
import { FaqComponent } from './Components/faq/faq.component';
import { PreventionComponent } from './Components/prevention/prevention.component';
import { ProtectionComponent } from './Components/protection/protection.component';
import { SymptomsComponent } from './Components/symptoms/symptoms.component';
import { TreatmentComponent } from './Components/treatment/treatment.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { LineChartComponent } from './Components/line-chart/line-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    ChartsComponent,
    SidebarComponent,
    AboutComponent,
    FaqComponent,
    PreventionComponent,
    ProtectionComponent,
    SymptomsComponent,
    TreatmentComponent,
    NotfoundComponent,
    RegisterComponent,
    LoginComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
