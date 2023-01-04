import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs';

import { navigateTo } from './state/navigation.actions';
import * as userActions from './state/user.actions';
import * as routerSelectors from './state/router.selectors';
import * as loaderSelectors from './state/loader.selector';

import * as rangeActions from './state/range.actions';
import * as calendarActions from './state/calendar.actions';

import { TreeMenuNode } from './features/side-menu-tree/tree-menu-node.model';
import { selectUser } from './state/user.selectors';
import { NavigationExtras } from '@angular/router';

import { CustomDatepickerI18n, I18n,  } from './datepicker-i18n.service';
import { User } from './features/login/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }], // define custom NgbDatepickerI18n provider

})
export class AppComponent implements OnInit, OnDestroy{

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
        name: "Відеокадри",
        icon: "",
        childNodes :[
          {
            name: "ПСГ",
            icon: "",
            expanded: false,
            childNodes :[
              {
                childNodes :[],
                name: "Обсяг газу карта",
                icon: "bi-activity",
                expanded: false,
                payload:{ routerLink:"dashboards/storagemap" }
              },
              {
                childNodes :[],
                name: "Обсяг діаграмма",
                icon: "bi-activity",
                expanded: false,
                payload:{ routerLink:"/component4" }
              },
              {
                childNodes :[],
                name: "Тех-акт газ графік",
                icon: "bi-activity",
                expanded: false,
                payload:{ routerLink:"/dashboards/actgascharts" }
              },                            
            ]
          },
          {
            name: "Погода",
            icon: "",
            expanded: false,
            childNodes :[
              {
                childNodes :[],
                name: "Карта",
                icon: "bi-activity",
                expanded: false,
                payload:{ routerLink:"/dashboards/wheathermap" }
              },
              {
                childNodes :[],
                name: "Графіки",
                icon: "bi-activity",
                expanded: false,
                payload:{ routerLink:"/dashboards/wheathercharts" }
              }              
            ]
          },
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

  currentUser : User = {
    _id:0,
    name:"Гість"
  };

  sub1 = this.user$.subscribe(usr=>{
    this.currentUser = usr;
  });

  onNavigate(url:string, params: NavigationExtras) {
    this.store.dispatch(navigateTo({ url, params }));
  }
  
  ngOnInit() {
    let date = this.calendar.getToday();
    let rangeStart = this.calendar.getPrev(date, "m", 1);
    this.selectedDay = date;
    this.store.dispatch(calendarActions.newDay({ date }));
    let range = {
      from: rangeStart,
      to: date
    };
    this.store.dispatch(rangeActions.newDatesRange({ range}));
  }

  sideMenuLeafClick(node:TreeMenuNode) {
    this.selectedNode = node;
    //console.log("App Select node", JSON.stringify(this.sideMenu));
    this.treeMenuStateReducer(this.sideMenu, node);
    this.store.dispatch(navigateTo({ url: node.payload.routerLink, params:{} }));
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

  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }
}