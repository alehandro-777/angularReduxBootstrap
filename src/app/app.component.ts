import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs';

import { navigateTo } from './state/navigation.actions';
import * as userActions from './state/user.actions';
import * as routerSelectors from './state/router.selectors';
import * as loaderSelectors from './state/loader.selector';

import { TreeMenuNode } from './features/side-menu-tree/tree-menu-node.model';
import { selectUser } from './state/user.selectors';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

sideMenu: TreeMenuNode[];
selectedNode: TreeMenuNode;
  
  constructor(private modalService: NgbModal, private store: Store) { 
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

}