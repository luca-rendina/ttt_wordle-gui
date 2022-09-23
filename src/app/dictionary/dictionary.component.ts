import { Component, OnInit } from '@angular/core';
import { WordleService } from '../wordle.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.less']
})
export class DictionaryComponent implements OnInit {

  throttle: number = 0
  distance: number = 0
  element_per_page: number = 1000
  page: number = 1
  dictionary: string[] = []
  alphabet: string[] = []
  dontScroll: boolean = false

  constructor(
    private ws: WordleService,
    private mainComponent: AppComponent
  ) { }

  ngOnInit(): void {

    const alpha = Array.from(Array(26)).map((e, i) => i + 97);
    this.alphabet = alpha.map((x) => String.fromCharCode(x));
    console.log(this.alphabet);
    this.getAllDictionary();

  }

  onScroll():void{
    if(!this.dontScroll){
      this.page++
      this.ws.getDictionary(this.page*this.element_per_page,this.page*this.element_per_page+this.element_per_page, '').subscribe(
        (result) => {
          console.log(result)
          this.dictionary.push( ...result.dictionary )
        },
        (error) => { 
          console.error(error) 
          this.mainComponent.error = error.message
        }
      )
    }
  }

  getDictionary(filter:string):void {
    if(filter.length == 0){
      this.getAllDictionary()
    } else {
      this.dontScroll = true
      this.getFilteredDictionary(filter)
    }
    
  }

  getAllDictionary(){
    this.dontScroll = false
    this.page = 0
    this.ws.getDictionary(0,this.element_per_page, '').subscribe(
      (result) => {
        console.log(result)
        this.dictionary = result.dictionary
      },
      (error) => { 
        console.error(error)
        this.mainComponent.error = error.message
      }
    )
  }

  getFilteredDictionary(filter:string){
    this.ws.getDictionary(0, 0, filter).subscribe(
      (result) => {
        console.log(result)
        this.dictionary = result.dictionary
      },
      (error) => { 
        console.error(error) 
        this.mainComponent.error = error.message
      }
    )
  }

}
