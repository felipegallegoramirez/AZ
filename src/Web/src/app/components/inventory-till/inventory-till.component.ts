import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { monitorEventLoopDelay } from 'perf_hooks';

@Component({
  selector: 'app-inventory-till',
  templateUrl: './inventory-till.component.html',
  styleUrls: ['./inventory-till.component.css']
})
export class InventoryTillComponent implements OnInit {
  button = 'Finish';
  contador:number=1;
  constructor() { }

  ngOnInit(): void {
  }

  Modal1(){
    if(this.contador==0){
      document.querySelector("#Mymodal")?.classList.add("visto")
      this.contador=1
    }else{
      document.querySelector("#Mymodal")?.classList.remove("visto")
      this.contador=0
    }

  }
}
