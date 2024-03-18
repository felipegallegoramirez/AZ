import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService } from '../../../services/auth.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-emailcode',
  templateUrl: './emailcode.component.html',
  styleUrls: ['./emailcode.component.css'],
  providers: [AuthService]
})
export class EmailcodeComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute,public authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var id =  params['id']
      var data = {
        code: Number(params['code'])
      }
      
      console.log(data)
      this.authService.postAuthCode(data,id).subscribe(res=>{
          console.log(res)
          var x = res.token
          var y = res.shopid
          localStorage.setItem('token',x);
          localStorage.setItem('shop',y);
          window.location.replace(environment.baseUrl+"home");
      })

      //

    })
  }

}
