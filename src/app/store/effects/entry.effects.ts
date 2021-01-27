import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import * as EntryActions from '../actions';
import { EntryDataService } from '../services';

const toAction = EntryActions.toAction();
type EntryAction = EntryActions.EntryAction;
type GetEntryAction = EntryActions.GetEntry;

@Injectable()
export class EntryEffects {

  @Effect()
  getEntries$: Observable<Action> = this.actions$
    .pipe(
      ofType(EntryActions.GET_ENTRIES),
      switchMap(() =>
        toAction(
          this.entryDataService.getEntries(),
          EntryActions.GetEntriesSuccess,
          EntryActions.GetEntriesError
        )
      )
    );

    @Effect()
    getEntry$: Observable<Action> = this.actions$
      .pipe(
        ofType(EntryActions.GET_ENTRY),
        switchMap((action: GetEntryAction) =>
          toAction(
            this.entryDataService.getEntry(action.payload),
            EntryActions.GetEntrySuccess,
            EntryActions.GetEntryError
          )
        )
      );

  @Effect()
  addEntry$: Observable<Action> = this.actions$
    .pipe(
      ofType(EntryActions.ADD_ENTRY),
      concatMap((action: EntryAction) =>
        toAction(
          this.entryDataService.addEntry(action.payload),
          EntryActions.AddEntrySuccess,
          EntryActions.AddEntryError
        )
      )
    );

  @Effect()
  deleteEntry$: Observable<Action> = this.actions$
    .pipe(
      ofType(EntryActions.DELETE_ENTRY),
      concatMap((action: EntryAction) =>
        toAction(
          this.entryDataService.deleteEntry(action.payload),
          EntryActions.DeleteEntrySuccess,
          EntryActions.DeleteEntryError
        )
      )
    );

  @Effect()
  updateEntry$: Observable<Action> = this.actions$
    .pipe(
      ofType<EntryActions.UpdateEntry>(EntryActions.UPDATE_ENTRY),
      concatMap((action: EntryAction) =>
        toAction(
          this.entryDataService.updateEntry(action.payload),
          EntryActions.UpdateEntrySuccess,
          EntryActions.UpdateEntryError
        )
      )
    );
    @Effect()
    getPhonebooks$: Observable<Action> = this.actions$
      .pipe(
        ofType(EntryActions.GET_PHONEBOOKS),
        switchMap(() =>
          toAction(
            this.entryDataService.getPhonebooks(),
            EntryActions.GetPhonebooksSuccess,
            EntryActions.GetPhonebooksError
          )
        )
      );
  constructor(
    private actions$: Actions,
    private entryDataService: EntryDataService
  ) {}

}
