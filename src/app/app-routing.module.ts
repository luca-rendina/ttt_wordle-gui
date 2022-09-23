import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { WordleComponent } from './wordle/wordle.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

const routes: Routes = [
  // Main game
  {
    path: '', //HOME
    component: WordleComponent
  },
  {
    path: 'wordle',
    component: WordleComponent
  },
  // complete list of words
  {
    path: 'dictionary',
    component: DictionaryComponent
  },
  //File not found
  {
    path: '**', //Default:
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
