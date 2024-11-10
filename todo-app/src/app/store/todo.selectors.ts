// src/app/store/todo.selectors.ts
import { createSelector } from '@ngrx/store';
import { State } from './todo.reducer';

export const selectTodos = (state: State) => state.todos;
export const selectError = (state: State) => state.error;
