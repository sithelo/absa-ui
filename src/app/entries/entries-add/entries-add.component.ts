import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entry } from '../../core/model/entry';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrySelectors, EntityState } from '../../store';
// import * as EntryAction from '../../store/actions';
import * as AllAction from '../../store/actions';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Phonebook } from '../../core/model/phonebook';

@Component({
  selector: 'app-entries-add',
  templateUrl: './entries-add.component.html',
  styleUrls: ['./entries-add.component.scss']
})
export class EntriesAddComponent implements OnInit, OnDestroy {

  entryForm = this.formBuilder.group({
    entryId: [],
    phonebookId:  ['', Validators.required],
    name: ['', Validators.required],
    phonenumber: ['', Validators.required]
  });

  entry: Entry;
  phonebook: Phonebook[];
  loading$: Observable<boolean>;
  sub: Subscription;

  constructor(
    private store: Store<EntityState>,
    private entrySelectors: EntrySelectors,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.sub = this.entrySelectors.phonebooks$.subscribe(bk => {
      if (bk) {
        this.phonebook = bk;
        //  this.entryForm.patchValue
        //  this.entryForm.patchValue(this.entry);
      }
    });
    this.loading$ = this.entrySelectors.loading$;
  }



  ngOnInit() {
    this.entries()
  }

  entries() {
    this.store.dispatch(new AllAction.GetPhonebooks());//
  }
  submit() {
    if (this.entryForm.valid) {
      const entryValue = { ...this.entry, ...this.entryForm.value };
      console.log(entryValue);
      this.store.dispatch(new AllAction.AddEntry(entryValue));
      this.router.navigate(['/entries']);
    }

  }


  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
