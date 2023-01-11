import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './features/admin/user-edit/user-edit.component';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { BarChartComponent } from './features/charting/bar-chart/bar-chart.component';
import { ActGasChartsComponent } from './features/dashboards/act-gas-charts/act-gas-charts.component';
import { GasStorageMapComponent } from './features/dashboards/gas-storage-map/gas-storage-map.component';
import { TemperatureMapComponent } from './features/dashboards/temperature-map/temperature-map.component';
import { TemperaturesChartsComponent } from './features/dashboards/temperatures-charts/temperatures-charts.component';
import { ErrorComponent } from './features/error/error.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Component1Component } from './temp/componets/component1/component1.component';
import { Component2Component } from './temp/componets/component2/component2.component';
import { Component3Component } from './temp/componets/component3/component3.component';
import { Component4Component } from './temp/componets/component4/component4.component';


const routes: Routes = [
  { path: 'dashboards/actgascharts', component: ActGasChartsComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/wheathercharts', component: TemperaturesChartsComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/wheathermap', component: TemperatureMapComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/storagemap', component: GasStorageMapComponent, canActivate: [AuthGuard], },
  { path: 'component1', component: Component1Component, canActivate: [AuthGuard], },
  { path: 'component2', component: Component2Component, canActivate: [AuthGuard], },
  { path: 'component3', component: Component3Component, canActivate: [AuthGuard], },
  { path: 'component4', component: Component4Component, canActivate: [AuthGuard], },

  { path: 'users/list', component: UserListComponent, canActivate: [AuthGuard], },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard], }, 

  { path: 'bar', component: BarChartComponent },

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
