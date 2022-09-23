import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  error:string = ''

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['/'])
  }

  goDictionary(){
    this.router.navigate(['/dictionary'])
  }
}