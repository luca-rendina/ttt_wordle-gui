import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { DictionaryI, GuessResponseI, RulesI } from './interface/wordle.interface';

@Injectable({
  providedIn: 'root'
})
export class WordleService {

  constructor(
    private http: HttpClient
  ) { }

  getDictionary(starting:number, ending:number, filter:string) : Observable<DictionaryI>{
    console.log("getDictionary() from api")   
    const headers = { 'content-type': 'application/json' }
    const body = { starting:starting, 
                   ending:ending,
                   filter:filter  
                  }
    return this.http.post<DictionaryI>(environment.wsDictionary, body, {'headers':headers}) as Observable<DictionaryI>;
  }

  guess(guess: string) : Observable<GuessResponseI>{
    console.log("guess() from api")
    const headers = { 'content-type': 'application/json' }
    const body = { guess: guess }
    return this.http.post<GuessResponseI>(environment.wsGuess, body, { 'headers':headers }) as Observable<GuessResponseI>
  }

  getInformation() : Observable<RulesI>{
    console.log("getInformation() from api")
    return this.http.get<RulesI>(environment.wsHome) as Observable<RulesI>;
  }

  reset() : Observable<GuessResponseI>{
    console.log("reset() from api")
    return this.http.get<GuessResponseI>(environment.wsReset) as Observable<GuessResponseI>;
  }
}
