import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as navigationActions  from 'src/app/state/navigation.actions';
import * as userActions from 'src/app/state/user.actions';
import * as userSelectors from 'src/app/state/user.selectors';
import { User } from '../../login/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  pageIndex = 1;
  usersState$ = this.store.select(userSelectors.selectUsersState);
  pageSize = 30;
  collectionSize = 0;
  users : User[] =[];

  sub1 = this.usersState$.subscribe(state=>{
    this.users = state.usersPage?.data ?? [];
    this.pageSize = state.pageSize;
    this.collectionSize = state?.usersPage?.total ?? 0;
  });

  constructor( private store: Store, ) { }

  ngOnInit(): void {
    this.store.dispatch(userActions.loadUserPage({limit: this.pageSize, skip: this.pageSize*(this.pageIndex-1)}))
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

  test() {
    this.store.dispatch(userActions.loadUserPage({limit: this.pageSize, skip: this.pageSize*(this.pageIndex-1)}))
  }

  edit(id:number) {
    this.store.dispatch(userActions.getUserById({ id }));
    this.store.dispatch(navigationActions.navigateTo({url: `users/edit/${id}`}))
  }

  delete(id:number) {

  }

}
