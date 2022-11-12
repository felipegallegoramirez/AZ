import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RServiceServiceComponent } from './components/r-service-service/r-service-service.component';
import { RServiceWorkspaceComponent } from './components/r-service-workspace/r-service-workspace.component';


const routes: Routes = [
  { path: 'login', component: LoginRegisterComponent },
  { path: 'forgot-Password', component: ForgotPasswordComponent },
  { path: 'change-Password', component: ChangePasswordComponent },
  { path: 'reserve-service', component: RServiceServiceComponent },
  { path: 'reserve-workspace', component: RServiceWorkspaceComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    RServiceServiceComponent,
    RServiceWorkspaceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash:true}),

  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
