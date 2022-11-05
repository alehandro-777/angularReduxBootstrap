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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private modalService: NgbModal, private store: Store) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
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

}