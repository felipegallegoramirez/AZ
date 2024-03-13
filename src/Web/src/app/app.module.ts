import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login/login-register/login-register.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component';
import { HomeComponent } from './components/misc/home/home.component';

import { UserManagmentComponent } from './components/managment/user-managment/user-managment.component';
import { PanelWorkspaceComponent } from './components/panel-workspace/panel-workspace.component';
import { SoldManagmentComponent } from './components/managment/sold-managment/sold-managment.component';

import { InventoryTillComponent } from './components/inventory-till/inventory-till.component';
import { EmailsendComponent } from './components/login/emailsend/emailsend.component';
import { EmailcodeComponent } from './components/login/emailcode/emailcode.component';
import { EmployeeManagmentComponent } from './components/managment/employee-managment/employee-managment.component';
import { InventoryeManagmentComponent } from './components/managment/inventorye-managment/inventorye-managment.component';
import { PorfileComponent } from './components/misc/porfile/porfile.component';
import { ComingSoonComponent } from './components/misc/coming-soon/coming-soon.component';
import { SimpleShopMainComponent } from './components/shop-mobile/simple-shop-main/simple-shop-main.component';
import { SimpleShopCartComponent } from './components/shop-mobile/simple-shop-cart/simple-shop-cart.component';
import { SimpleShopCartCheckoutComponent } from './components/shop-mobile/simple-shop-cart-checkout/simple-shop-cart-checkout.component';
import { SimpleShopManagmentComponent } from './components/shop-mobile/simple-shop-managment/simple-shop-managment.component';
import { DistributorManagmentComponent } from './components/managment/distributor-managment/distributor-managment.component';
import { DistributorHistoryComponent } from './components/distributor-history/distributor-history.component';
import { DistributorhistoryManagmentComponent } from './components/managment/distributorhistory-managment/distributorhistory-managment.component';




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
  { path: 'shop-main/:id',component:SimpleShopMainComponent},
  { path: 'shop-cart/:id',component:SimpleShopCartComponent},
  { path: 'shop-checkout/:id',component:SimpleShopCartCheckoutComponent},
  { path: 'shop-managment',component:SimpleShopManagmentComponent},
  { path: 'distribuitor-managment',component:DistributorManagmentComponent},
  { path: 'distribuitor-history',component:DistributorHistoryComponent},
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
    ComingSoonComponent,
    SimpleShopMainComponent,
    SimpleShopCartComponent,
    SimpleShopCartCheckoutComponent,
    SimpleShopManagmentComponent,
    DistributorManagmentComponent,
    DistributorHistoryComponent,
    DistributorhistoryManagmentComponent
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
