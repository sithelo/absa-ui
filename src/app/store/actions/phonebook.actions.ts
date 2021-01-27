import { Action } from '@ngrx/store';

import { Phonebook } from '../../core/model/phonebook';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';

export const GET_PHONEBOOK = '[Phonebook] GET_PHONEBOOK';
export const GET_PHONEBOOK_SUCCESS = '[Phonebook] GET_PHONEBOOK_SUCCESS';
export const GET_PHONEBOOK_ERROR = '[Phonebook] GET_PHONEBOOK_ERROR';

export const GET_PHONEBOOKS = '[Phonebook] GET_PHONEBOOKS';
export const GET_PHONEBOOKS_SUCCESS = '[Phonebook] GET_PHONEBOOKS_SUCCESS';
export const GET_PHONEBOOKS_ERROR = '[Phonebook] GET_PHONEBOOKS_ERROR';

export abstract class PhonebookAction implements DataAction<Phonebook> {
  readonly type: string;
  constructor(public readonly payload: Phonebook) {}
}

export abstract class PhonebookErrorAction implements DataErrorAction<Phonebook> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<Phonebook>) {}
}

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

export class GetPhonebook implements Action {
  readonly type = GET_PHONEBOOK;
  constructor(public readonly payload: string) {}
}

export class GetPhonebookSuccess extends PhonebookAction {
  readonly type = GET_PHONEBOOK_SUCCESS;
}

export class GetPhonebookError extends PhonebookErrorAction {
  readonly type = GET_PHONEBOOK_ERROR;
}

export type AllPhonebookActions =
  | GetPhonebooks
  | GetPhonebooksSuccess
  | GetPhonebooksError;
