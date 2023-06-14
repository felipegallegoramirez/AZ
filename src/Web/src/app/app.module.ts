import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';

import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { PanelWorkspaceComponent } from './components/panel-workspace/panel-workspace.component';
import { SoldManagmentComponent } from './components/sold-managment/sold-managment.component';

import { InventoryTillComponent } from './components/inventory-till/inventory-till.component';
import { EmailsendComponent } from './components/emailsend/emailsend.component';
import { EmailcodeComponent } from './components/emailcode/emailcode.component';
import { EmployeeManagmentComponent } from './components/employee-managment/employee-managment.component';
import { InventoryeManagmentComponent } from './components/inventorye-managment/inventorye-managment.component';
import { PorfileComponent } from './components/porfile/porfile.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';


const routes: Routes = [
  { path: 'login', component: LoginRegisterComponent },
  { path: 'forgot-Password', component: ForgotPasswordComponent },
  { path: 'change-Password', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent},
  { path: 'panel-workspace', component: PanelWorkspaceComponent },
  { path: 'user-managment', component: UserManagmentComponent },
  { path: 'sold-managment', component: SoldManagmentComponent },
  { path: 'employee-managment', component: EmployeeManagmentComponent },
  { path: 'inventory-managment', component: InventoryeManagmentComponent },
  { path: 'inventory-till', component:InventoryTillComponent},
  { path: 'emailcode/:id/:code', component:EmailcodeComponent},
  { path: 'emailsend', component:EmailsendComponent},
  { path: 'comingSoon',component:ComingSoonComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    HomeComponent,
    UserManagmentComponent,
    PanelWorkspaceComponent,
    SoldManagmentComponent,
    InventoryTillComponent,
    EmailsendComponent,
    EmailcodeComponent,
    EmployeeManagmentComponent,
    InventoryeManagmentComponent,
    PorfileComponent,
    ComingSoonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash:true}),

  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
