import { createReducer, on } from '@ngrx/store';

import { retrievedBookList } from './book.actions';
import { Book } from '../temp/redux/book-list/book.model';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => books)
);