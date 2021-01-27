import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { EntryEffects } from './effects/entry.effects';

import { EntryDataService, EntrySelectors } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature([ EntryEffects ])
  ],
  providers: [
    EntryDataService,
    EntrySelectors

  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
