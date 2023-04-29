import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService } from '../../services/auth.service';

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
          var x = res.token
          localStorage.setItem('token',x);
          window.location.replace("http://localhost:4200/#/aboutus");
      })

      //

    })
  }

}
