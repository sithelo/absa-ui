import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector, select } from '@ngrx/store';

import { EntityState } from '../reducers';
import { EntryState } from '../reducers/entry.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getEntryState = createSelector(
  getEntityState,
  (state: EntityState) => {console.log(state); return state.entries}
);

const getAllEntries = createSelector(
  getEntryState,
  (state: EntryState) => state.entries
);
const getAllPhonebooks = createSelector(
  getEntryState,
  (state: EntryState) => {console.log(state); return state.phonebooks}
);
const getEntry = createSelector(
  getEntryState,
  (state: EntryState) => state.entry
);

const getEntriesLoading = createSelector(
  getEntryState,
  (state: EntryState) => state.loading
);

@Injectable()
export class EntrySelectors {

  constructor(private store: Store<EntityState>) {}

  entries$ = this.store.pipe(select(getAllEntries));
  phonebooks$ = this.store.pipe(select(getAllPhonebooks));
  entry$ = this.store.pipe(select(getEntry));
  entryState$ = this.store.pipe(select(getEntryState));
  loading$ = this.store.pipe(select(getEntriesLoading));

}
