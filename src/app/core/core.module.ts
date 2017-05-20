import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { settingsReducer, SettingsEffects } from '../settings';

import { LocalStorageService } from './local-storage/local-storage.service';
import {
  localStorageInitStateMiddleware
} from './local-storage/local-storage.middleware';


export function createReducer(asyncReducers = {}): ActionReducer<any> {
  return localStorageInitStateMiddleware(
    combineReducers(Object.assign({
      settings: settingsReducer
    }, asyncReducers))
  );
}

const reducer = createReducer();

export function reducerAoT(state, action) {
  return reducer(state, action);
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.provideStore(reducerAoT),
    EffectsModule.run(SettingsEffects)
  ],
  declarations: [],
  providers: [LocalStorageService]
})
export class CoreModule { }
