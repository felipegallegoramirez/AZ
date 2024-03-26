import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fup';
  contador:number = 0;
  changelog:boolean=false

  constructor(private router: Router) {}
  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url.slice(0,9))
        if (event.url != '/aboutus' && event.url != '/login' && event.url != '/emailsend' && event.url.slice(0,10) != '/emailcode') {

              // ! Recuerde cambiar el changelog
          if(localStorage.getItem("version")!="2"){
            this.changelog=true
          }
          let x = localStorage.getItem('token');
          if (!x) {
            window.location.replace(`${environment.baseUrl}login`);
          }
        }
      }
    });
  }

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
    localStorage.removeItem('version');
    window.location.replace(environment.baseUrl+"aboutus");
  }

}
