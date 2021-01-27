import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entry } from '../../core/model/entry';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrySelectors, EntityState } from '../../store';
import * as EntryAction from '../../store/actions';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-entries-edit',
  templateUrl: './entries-edit.component.html',
  styleUrls: ['./entries-edit.component.scss']
})
export class EntriesEditComponent implements OnInit, OnDestroy {

  entryForm = this.formBuilder.group({
    entryId: [],
    phonebookId: [],
    phonebookName: [],
    name: ['', Validators.required],
    phonenumber: ['', Validators.required]
  });

  entry: Entry;
  loading$: Observable<boolean>;
  sub: Subscription;

  constructor(
    private store: Store<EntityState>,
    private entrySelectors: EntrySelectors,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.sub = this.entrySelectors.entry$.subscribe(entr => {
      if (entr) {
        this.entry = entr;
        this.entryForm.patchValue(this.entry);
      }
    });
    this.loading$ = this.entrySelectors.loading$;
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new EntryAction.GetEntry(id));
  }

  submit() {
    if (this.entryForm.valid) {
      const entryValue = { ...this.entry, ...this.entryForm.value };
      this.store.dispatch(new EntryAction.UpdateEntry(entryValue));
      this.router.navigate(['/entries']);
    }

  }

  add(entry: Entry) {
    this.store.dispatch(new EntryAction.AddEntry(entry));
  }

  delete(entry: Entry) {
    this.store.dispatch(new EntryAction.DeleteEntry(entry));
  }

  update(entry: Entry) {
    this.store.dispatch(new EntryAction.UpdateEntry(entry));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
