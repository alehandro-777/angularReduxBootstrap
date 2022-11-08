import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { of, tap, map } from 'rxjs';

import { selectBookCollection, selectBooks } from './state/books.selectors';
import {
  addBook,
  removeBook,
  loadBookList
} from './state/book.actions';

import { selectUrl, selectCurrentRoute, selectFragment, selectRouteData } from './state/router.selectors';
import { TreeMenuNode } from './features/side-menu-tree/tree-menu-node.model';


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
 
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);
  
  fragment$ = this.store.select(selectFragment).pipe(tap(f=>console.log("fragment", f)));
  currentRoute$ = this.store.select(selectCurrentRoute).pipe(tap(f=>console.log("currentroute",f)), map(x=> JSON.stringify(x)));
  url$ = this.store.select(selectUrl).pipe(tap(f=>console.log("url", f)));
  routeData$ = this.store.select(selectRouteData).pipe(tap(f=>console.log("routedat", f)), map(x=> JSON.stringify(x)));

 

  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }
 
  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }
 
 
  ngOnInit() {
    this.store.dispatch(loadBookList());
  }

  sideMenuLeafClick(node:TreeMenuNode) {
    this.selectedNode = node;
    //console.log("App Select node", JSON.stringify(this.sideMenu));

    this.treeMenuStateReducer(this.sideMenu, node);

    //this.sideMenu = [...this.sideMenu];
    //console.log("App Select node", JSON.stringify(this.sideMenu));
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


}