import { Component, OnInit } from '@angular/core';

import { Entry } from '../core/model/entry';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EntityState, EntrySelectors } from '../store';
import * as EntryAction from '../store/actions';

@Component({
    selector: 'app-entries',
    templateUrl: './entries.component.html'
})
export class EntriesComponent implements OnInit {
    title = 'Entries';
    entries$: Observable<Entry[]>;
    loading$: Observable<boolean>;

    constructor(
        private store: Store<EntityState>,
        private entrySelectors: EntrySelectors) {
        this.entries$ = this.entrySelectors.entries$;
        this.loading$ = this.entrySelectors.loading$;
    }

    ngOnInit() {
        this.getEntries();
    }

    getEntries() {
        this.store.dispatch(new EntryAction.GetEntries());
        //this.store.dispatch(new EntryAction.GetPhonebooks());
    }

}
