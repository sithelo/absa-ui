import { Action } from '@ngrx/store';

import { Entry } from '../../core/model/entry';
import { Phonebook } from '../../core/model/phonebook';
import { DataServiceError } from '../services';

import { DataAction, DataErrorAction } from './data.actions';

export const ADD_ENTRY = '[Entry] ADD_ENTRY';
export const ADD_ENTRY_ERROR = '[Entry] ADD_ENTRY_ERROR';
export const ADD_ENTRY_SUCCESS = '[Entry] ADD_ENTRY_SUCCESS';


export const GET_ENTRY = '[Entry] GET_ENTRY';
export const GET_ENTRY_SUCCESS = '[Entry] GET_ENTRY_SUCCESS';
export const GET_ENTRY_ERROR = '[Entry] GET_ENTRY_ERROR';

export const UPDATE_ENTRY = '[Entry] UPDATE_ENTRY';
export const UPDATE_ENTRY_SUCCESS = '[Entry] UPDATE_ENTRY_SUCCESS';
export const UPDATE_ENTRY_ERROR = '[Entry] UPDATE_ENTRY_ERROR';

export const GET_ENTRIES = '[Entry] GET_ENTRIES';
export const GET_ENTRIES_SUCCESS = '[Entry] GET_ENTRIES_SUCCESS';
export const GET_ENTRIES_ERROR = '[Entry] GET_ENTRIES_ERROR';

export const DELETE_ENTRY = '[Entry] DELETE_ENTRY';
export const DELETE_ENTRY_SUCCESS = '[Entry] DELETE_ENTRY_SUCCESS';
export const DELETE_ENTRY_ERROR = '[Entry] DELETE_ENTRY_ERROR';

export const GET_PHONEBOOKS = '[Phonebook] GET_PHONEBOOKS';
export const GET_PHONEBOOKS_SUCCESS = '[Phonebook] GET_PHONEBOOKS_SUCCESS';
export const GET_PHONEBOOKS_ERROR = '[Phonebook] GET_PHONEBOOKS_ERROR';


export const SET_ENTRY_LOADING = '[Entry] SET_ENTRY_LOADING';

export abstract class EntryAction implements DataAction<Entry> {
  readonly type: string;
  constructor(public readonly payload: Entry) {}
}

export abstract class EntryErrorAction implements DataErrorAction<Entry> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<Entry>) {}
}

export class GetEntries implements Action {
  readonly type = GET_ENTRIES;
}

export class GetEntriesSuccess implements Action {
  readonly type = GET_ENTRIES_SUCCESS;
  constructor(public readonly payload: Entry[]) {}
}

export class GetEntriesError implements Action {
  readonly type = GET_ENTRIES_ERROR;
  constructor(public readonly payload: any) {}
}
// Phonebooks
export class GetPhonebooks implements Action {
  readonly type = GET_PHONEBOOKS;
}

export class GetPhonebooksSuccess implements Action {
  readonly type = GET_PHONEBOOKS_SUCCESS;
  constructor(public readonly payload: Phonebook[]) {}
}

export class GetPhonebooksError implements Action {
  readonly type = GET_PHONEBOOKS_ERROR;
  constructor(public readonly payload: any) {}
}
export class GetEntry implements Action {
  readonly type = GET_ENTRY;
  constructor(public readonly payload: string) {}
}

export class GetEntrySuccess implements Action {
  readonly type = GET_ENTRY_SUCCESS;
  constructor(public readonly payload: Entry) {}
}

export class GetEntryError extends EntryErrorAction {
  readonly type = GET_ENTRY_ERROR;
}

export class AddEntry extends EntryAction {
  readonly type = ADD_ENTRY;
}

export class AddEntrySuccess extends EntryAction {
  readonly type = ADD_ENTRY_SUCCESS;
}

export class AddEntryError extends EntryErrorAction {
  readonly type = ADD_ENTRY_ERROR;
}

export class UpdateEntry extends EntryAction {
  readonly type = UPDATE_ENTRY;
}

export class UpdateEntrySuccess extends EntryAction {
  readonly type = UPDATE_ENTRY_SUCCESS;
}

export class UpdateEntryError extends EntryErrorAction {
  readonly type = UPDATE_ENTRY_ERROR;
}

export class DeleteEntry extends EntryAction {
  readonly type = DELETE_ENTRY;
}

export class DeleteEntrySuccess extends EntryAction {
  readonly type = DELETE_ENTRY_SUCCESS;
}

export class DeleteEntryError extends EntryErrorAction {
  readonly type = DELETE_ENTRY_ERROR;
}

export class SetEntryLoading {
  readonly type = SET_ENTRY_LOADING;
  constructor(public payload = true) {}
}

export type AllEntryActions =
  | GetEntry
  | GetEntrySuccess
  | GetEntryError
  | UpdateEntry
  | UpdateEntrySuccess
  | UpdateEntryError
  | GetEntries
  | GetEntriesSuccess
  | GetEntriesError
  | AddEntry
  | AddEntrySuccess
  | AddEntryError
  | DeleteEntry
  | DeleteEntrySuccess
  | DeleteEntryError
  | SetEntryLoading
  | GetPhonebooks
  | GetPhonebooksSuccess
  | GetPhonebooksError;
