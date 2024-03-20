import { Component } from '@angular/core';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fup';
  contador:number = 0;

  Hidden(){
    if(this.contador==0){
        document.querySelector("#Central")?.classList.add("visto"),
        this.contador=1}

    else{
        document.querySelector("#Central")?.classList.remove("visto"),
        this.contador=0
    }
  }

  leave(){
    localStorage.removeItem('token');
    localStorage.removeItem('shop');
    window.location.replace(environment.baseUrl+"aboutus");
  }

}
