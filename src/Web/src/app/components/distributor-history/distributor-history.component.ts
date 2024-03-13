import { Component, OnInit } from '@angular/core';
import { DistributorHistory } from 'src/app/models/modelsDistributor/distributorhistory';
import { DistributorHistoryService } from 'src/app/services/servicesDistributor/distributorhistory.service';


@Component({
  selector: 'app-distributor-history',
  templateUrl: './distributor-history.component.html',
  styleUrls: ['./distributor-history.component.css']
})
export class DistributorHistoryComponent implements OnInit {
  constructor(private distributorHistoryService:DistributorHistoryService) { }

  ngOnInit(): void {
    this.search()
  }


  rara(op:number) {
    let a=document.querySelector(".inf")?.children[0].children[op*2].children[0].children[0]
    if(a?.classList.contains("noocult")){
      a.classList.remove("noocult")
    }else{
      a?.classList.add("noocult")
    }
  }

  dihi:Array<DistributorHistory>=[]


  search(){
    // order -  cate - search
    let order= (<HTMLInputElement>document.getElementById("order")).value
    let cate= (<HTMLInputElement>document.getElementById("cate")).value
    let search= (<HTMLInputElement>document.getElementById("search")).value
    let or=order.split("/")
    this.distributorHistoryService.getDistributorHistorySearch(search,1,1000,or[0],Number(or[1]),localStorage.getItem("shop")||"").subscribe((res)=>{
      this.dihi= res as DistributorHistory[]
      
    })

  }

}
