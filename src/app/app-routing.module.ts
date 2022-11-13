import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './features/error/error.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { Component1Component } from './temp/componets/component1/component1.component';
import { Component2Component } from './temp/componets/component2/component2.component';
import { Component3Component } from './temp/componets/component3/component3.component';
import { Component4Component } from './temp/componets/component4/component4.component';


const routes: Routes = [
  { path: 'component1', component: Component1Component },
  { path: 'component2', component: Component2Component },
  { path: 'component3', component: Component3Component },
  { path: 'component4', component: Component4Component },
  
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
