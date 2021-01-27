import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { FilterTextboxComponent } from './entries-list/filter-textbox.component';
import { EntriesComponent } from './entries.component';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesEditComponent } from './entries-edit/entries-edit.component';
import { EntriesAddComponent } from './entries-add/entries-add.component';

@NgModule({
    imports: [ CommonModule, SharedModule, EntriesRoutingModule ],
    declarations: [ EntriesListComponent, FilterTextboxComponent, EntriesComponent, EntriesEditComponent, EntriesAddComponent]
})
export class EntriesModule { }
