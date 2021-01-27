import { Entry } from '../../core/model/entry';
import * as EntryActions from '../actions';
import { Phonebook } from '../../core/model/phonebook';

export interface EntryState {
  entries: Entry[];
  entry: Entry;
  phonebooks: Phonebook[];
  loading: boolean;
  error: boolean;
}

export const initialState: EntryState = {
  entries: [],
  entry: null,
  phonebooks: [],
  loading: false,
  error: false
};

export function reducer(
  state = initialState,
  action: EntryActions.AllEntryActions
): EntryState {

  switch (action.type) {
    case EntryActions.ADD_ENTRY: {
      return { ...state, loading: true };
    }

    case EntryActions.ADD_ENTRY_SUCCESS: {
      return {
        ...state,
        loading: false,
        entries: [...state.entries, { ...action.payload }]
      };
    }

    case EntryActions.ADD_ENTRY_ERROR: {
      return { ...state, loading: false };
    }

    case EntryActions.GET_ENTRIES: {
      return { ...state, loading: true };
    }

    case EntryActions.GET_ENTRIES_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case EntryActions.GET_ENTRIES_SUCCESS: {
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    }
    // Phonebook

    case EntryActions.GET_PHONEBOOKS: {
      return { ...state, loading: true };
    }

    case EntryActions.GET_PHONEBOOKS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case EntryActions.GET_PHONEBOOKS_SUCCESS: {
      return {
        ...state,
        phonebooks: action.payload,
        loading: false
      };
    }

    case EntryActions.GET_ENTRY: {
      return { ...state, loading: true };
    }

    case EntryActions.GET_ENTRY_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case EntryActions.GET_ENTRY_SUCCESS: {
      return {
        ...state,
        entry: action.payload,
        loading: false
      };
    }

    case EntryActions.DELETE_ENTRY: {
      return {
        ...state,
        loading: true,
        entries: state.entries.filter(h => h !== action.payload)
      };
    }

    case EntryActions.DELETE_ENTRY_SUCCESS: {
      const result = { ...state, loading: false };
      return result;
    }

    case EntryActions.DELETE_ENTRY_ERROR: {
      return {
        ...state,
        entries: [...state.entries, action.payload.requestData],
        loading: false
      };
    }

    case EntryActions.UPDATE_ENTRY: {
      return {
        ...state,
        entries: state.entries.map(h => {
          console.log('h ', h);
          console.log('Payload ', action.payload);
          console.log('My entries ', state);
          if (h.entryId === action.payload.entryId) {
            state.loading = true;
          }
          return h;
        })
      };
    }

    case EntryActions.UPDATE_ENTRY_SUCCESS: {
      return modifyEntryState(state, action.payload);
    }

    case EntryActions.UPDATE_ENTRY_ERROR: {
      return {
        ...state,
        loading: false,
        entries: state.entries.map(h => {
          if (h.entryId === action.payload.requestData.entryId) {
            // Huh? No idea what the error is!
            state.error = true;
          }
          return h;
        })
      };
    }

    case EntryActions.SET_ENTRY_LOADING: {
      return {
        ...state,
        loading: action.payload == null ? true : action.payload
      };
    }
  }
  return state;
}

function modifyEntryState(entryState: EntryState, entryChanges: Partial<Entry>): EntryState {

  return {
    ...entryState,
    loading: false,
    entries: entryState.entries.map(h => {
      if (h.entryId === entryChanges.entryId) {
        return { ...h, ...entryChanges };
      } else {
        return h;
      }
    })
  };

}
