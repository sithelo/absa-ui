import { ActionReducerMap } from '@ngrx/store';

import * as actions from '../actions';
import * as entriesReducers from './entry.reducer';


//export type Action = actions.;

export interface EntityState {
  entries: entriesReducers.EntryState;
}

export const reducers: ActionReducerMap<EntityState> = {
  entries: entriesReducers.reducer,
};
