import { Component, OnInit} from '@angular/core';
import { WordleService } from '../wordle.service';
import { Router } from '@angular/router';
import { GuessScoreI } from '../interface/wordle.interface';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.less']
})
export class WordleComponent implements OnInit {
  title = 'PseudoWordle';

  length_word: number = 0
  total_guesses: number = 0
  guesses: GuessScoreI[] = []
  verdict: number = 0
  guesses_remaining: number = 0
  currentGuess: string = ""

  constructor(
    private ws: WordleService,
    private router: Router,
    private mainComponent: AppComponent //TODO - Utilize a service for handling the errors visualization
  ) { }

  ngOnInit(): void {
    this.getInformation() // get information about the rules
    this.guess() // retrieve information if the user has previous saved data
  }

  getInformation(){
    this.ws.getInformation().subscribe(
      (result) => {
        console.log(result)
        this.length_word = result.length_word
        this.total_guesses = result.total_guesses
      },
      (error) => { 
        console.error(error) 
        this.mainComponent.error = error.message
      }
    )
  }

  showDictionary(){
    this.router.navigate(['/dictionary'])
  }

  guess(){
    this.ws.guess(this.currentGuess).subscribe(
      (result) => {
        console.log(result)
        this.guesses = result.guesses
        this.guesses_remaining = result.guessesRemaining
        this.verdict = result.verdict
        this.currentGuess = ''
      },
      (error) => { 
        console.error(error) 
        this.mainComponent.error = error.message
      }
    )
  }

  reset(){
    this.ws.reset().subscribe(
      (result) => {
        console.log(result)
        this.guesses = result.guesses
        this.guesses_remaining = result.guessesRemaining
        this.verdict = result.verdict
        this.currentGuess = ''
      },
      (error) => { 
        console.error(error) 
        this.mainComponent.error = error.message
      }
    )
  }

  getNRowsMatrix(){
    if(this.guesses)
      return this.total_guesses-this.guesses.length
    else{
      return this.total_guesses
    }
  }

  getNColumnsMatrix(){
    return this.length_word
  }

  getCellClass(g:GuessScoreI, index:number):string{
    return g.Score[index] == 0? 'incorrect': g.Score[index] == 1? 'bg-warning':'bg-success'
  }

  alphaNumberOnly (e:any) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e:any) {
    e.preventDefault();
    return false;
  }

  clsAlphaOnly (e:any) {  // Accept only alpha, no special characters 
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}
}

