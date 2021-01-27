import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntriesComponent } from './entries.component';
import { EntriesEditComponent } from './entries-edit/entries-edit.component';
import { EntriesAddComponent } from './entries-add/entries-add.component';

const routes: Routes = [
    { path: '', component: EntriesComponent },
    { path: 'add', component: EntriesAddComponent },
    { path: ':id', component: EntriesEditComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class EntriesRoutingModule {}
