import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BookListComponent } from './temp/redux/book-list/book-list.component';
import { booksReducer } from './state/book.reducer';
import { collectionReducer } from './state/collection.reducer';
import { BookCollectionComponent } from './temp/redux/book-collection/book-collection.component';
import { BookEffects } from './effects/book.effects';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { Component1Component } from './temp/componets/component1/component1.component';
import { Component2Component } from './temp/componets/component2/component2.component';
import { Component3Component } from './temp/componets/component3/component3.component';
import { SidebarComponent } from './temp/componets/sidebar/sidebar.component';
import { SideMenuTreeComponent } from './features/side-menu-tree/side-menu-tree.component';
import { SideMenuTreeNodeComponent } from './features/side-menu-tree/side-menu-tree-node/side-menu-tree-node.component';
import { LoginComponent } from './features/login/login.component';
import { userReducer } from './state/user.reducer';
import { UserEffects } from './effects/user.effects';
import { NavigateEffects } from './effects/navigate.effects';
import { HomeComponent } from './features/home/home.component';
import { ErrorComponent } from './features/error/error.component';
import { FormsModule } from '@angular/forms';
import { loaderReducer } from './state/loader.reducer';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SvgWinjet1Component } from './features/widjets/svg-winjet1/svg-winjet1.component';
import { Component4Component } from './temp/componets/component4/component4.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { LinearChartComponent } from './features/charting/linear-chart/linear-chart.component';
import { BarCart1Component } from './features/charting/bar-cart1/bar-cart1.component';
import { BarChartComponent } from './features/charting/bar-chart/bar-chart.component';
import { ProgressBarComponent } from './features/widjets/progress-bar/progress-bar.component';
import { calendarReducer } from './state/calendar.reducer';
import { GasStorageMapComponent } from './features/dashboards/gas-storage-map/gas-storage-map.component';
import { opdataReducer } from './state/opdata.reducers';
import { OpdataEffects } from './effects/opdata.effects';
import { PsgSvgWidjetComponent } from './features/widjets/psg-svg-widjet/psg-svg-widjet.component';
import { SmallTableComponent } from './features/widjets/small-table/small-table.component';
import { TableCellComponent } from './features/widjets/small-table/table-cell/table-cell.component';
import { TableSubCellComponent } from './features/widjets/small-table/table-sub-cell/table-sub-cell.component';



@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCollectionComponent,
    Component1Component,
    Component2Component,
    Component3Component,
    SidebarComponent,
    SideMenuTreeComponent,
    SideMenuTreeNodeComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    SvgWinjet1Component,
    Component4Component,
    LinearChartComponent,
    BarCart1Component,
    BarChartComponent,
    ProgressBarComponent,
    GasStorageMapComponent,
    PsgSvgWidjetComponent,
    SmallTableComponent,
    TableCellComponent,
    TableSubCellComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgChartsModule,
    
    StoreModule.forRoot({ 
      books: booksReducer, 
      collection: collectionReducer, 
      router: routerReducer, 
      user: userReducer,
      loading: loaderReducer,
      currentDate: calendarReducer,
      opdata: opdataReducer,

    }, {}),

    EffectsModule.forRoot([
      BookEffects,
      UserEffects,
      NavigateEffects,
      OpdataEffects,
      
    ]),
    
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    FormsModule
  ],
  providers: [  
    { provide: NgChartsConfiguration, useValue: { generateColors: true }},   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
