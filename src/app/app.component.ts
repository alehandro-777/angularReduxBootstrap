import { Component } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs';

import { navigateTo } from './state/navigation.actions';
import * as userActions from './state/user.actions';
import * as routerSelectors from './state/router.selectors';
import * as loaderSelectors from './state/loader.selector';

import * as calendarActions from './state/calendar.actions';

import { TreeMenuNode } from './features/side-menu-tree/tree-menu-node.model';
import { selectUser } from './state/user.selectors';
import { NavigationExtras } from '@angular/router';

import { CustomDatepickerI18n, I18n,  } from './datepicker-i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }], // define custom NgbDatepickerI18n provider

})
export class AppComponent {

sideMenu: TreeMenuNode[];
selectedNode: TreeMenuNode;

selectedDay: NgbDateStruct = {
  year:2022,
  month:11,
  day:20
};  

  constructor(private modalService: NgbModal, private store: Store, private calendar: NgbCalendar) { 
    this.sideMenu = [
      {
        name: "Node1",
        icon: "",
        childNodes :[
          {
            name: "Node2",
            icon: "",
            expanded: false,
            childNodes :[
              {
                childNodes :[],
                name: "Node4",
                icon: "bi-activity",
                expanded: false
              },
              {
                childNodes :[],
                name: "Node5",
                icon: "bi-activity",
                expanded: false
              }              
            ]
          },
          {
            childNodes :[],
            name: "Node3",
            icon: "bi-activity",
            expanded: false
          }
        ],
        payload: {},
        expanded: false
      }
    ];

    this.selectedNode = {
      childNodes:[],
      name:"",
      icon:"",
      payload:{},
      expanded:false
    };

  }
 
  user$ = this.store.select(selectUser);
  loader$ = this.store.select(loaderSelectors.selectLoader);


  //test test
  fragment$ = this.store.select(routerSelectors.selectFragment).pipe(tap(f=>console.log("fragment", f)));
  currentRoute$ = this.store.select(routerSelectors.selectCurrentRoute).pipe(tap(f=>console.log("currentroute",f)), map(x=> JSON.stringify(x)));
  url$ = this.store.select(routerSelectors.selectUrl).pipe(tap(f=>console.log("url", f)));
  routeData$ = this.store.select(routerSelectors.selectRouteData).pipe(tap(f=>console.log("routedat", f)), map(x=> JSON.stringify(x)));

 

  onNavigate(url:string, params: NavigationExtras) {
    this.store.dispatch(navigateTo({ url, params }));
  }
  
  ngOnInit() {
    let date = this.calendar.getToday();
    this.selectedDay = date;
    this.store.dispatch(calendarActions.newDay({ date }));
  }

  sideMenuLeafClick(node:TreeMenuNode) {
    this.selectedNode = node;
    //console.log("App Select node", JSON.stringify(this.sideMenu));
    this.treeMenuStateReducer(this.sideMenu, node);
  }

  treeMenuStateReducer(list:TreeMenuNode[], node:TreeMenuNode) {
    list.forEach(e=>{
      if (e===node) {
        e.selected = true;
      } else {
        e.selected = false;
      }
      this.treeMenuStateReducer(e.childNodes, node);
    });
  }

  singIn() {

  }

  singOut() {
    this.store.dispatch(navigateTo( {url: ""} ));
    this.store.dispatch(userActions.logOut());
  }
  
	clickSelectDay(date: NgbDate): void {
		//console.log("Date selection changed ", date)
    this.store.dispatch(calendarActions.newDay({ date }));
	}

}