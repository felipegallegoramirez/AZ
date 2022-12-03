import { AnimateChildOptions } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alturaanimado:number = 0;
  
  constructor() { }

  ngOnInit(): void {
    
  }
  
}
