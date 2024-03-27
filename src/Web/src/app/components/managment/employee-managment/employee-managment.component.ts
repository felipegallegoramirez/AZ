import { Component, OnInit } from '@angular/core';
import {User} from'../../../models/user'
import { UserService} from "../../../services/user.service"

@Component({
  selector: 'app-employee-managment',
  templateUrl: './employee-managment.component.html',
  styleUrls: ['./employee-managment.component.css'],
  providers: [UserService]
})
export class EmployeeManagmentComponent implements OnInit {

  constructor( private userService:UserService) { }

  
  employee: Array<{
    id:string;
    email: string;
    dni: number;
    name: string;
    phone: number;
    i:number
  }> =[]

  Nemploye: User[]=[]



  categorydata:boolean=true
  categoryselect:boolean=false
  edit:boolean=false
  update:boolean=false



  ngOnInit(): void {
    this.actualizar()
  }


  editar(){
    this.edit= this.edit==true?false:true
  }

  verify(name: string,value: string,min: number,max: number,type: string): boolean {
    if (value) {
      if (type == 'string') {
        let size = value.length;
        if (size < min) {
          alert(`${name} debe contener almenos ${min} caracteres`);
          return false;
        } else if (size > max) {
          alert(`${name} debe NO puede tener ${max} caracteres`);
          return false;
        } else {
          return true;
        }
      } else if (type == 'number') {
        let number = Number(value);

        if (number < min) {
          alert(`${name} debe ser mayor a ${min}`);
          return false;
        } else if (number > max) {
          alert(`${name} debe ser menor a ${max}`);
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      alert(`${name} No puede estar vacio`);
      return false;
    }
  }


  getClients(){
    this.employee=[]
    this.userService.getUsers(localStorage.getItem("shop")||"").subscribe((res) =>{
      this.Nemploye=[]
      this.Nemploye = res as User[]
      this.employee=[]
      for (let i=0; i< this.Nemploye.length ;i++){
                 
          this.employee.push({
          id:this.Nemploye[i]._id||"",
          email:this.Nemploye[i].email||"",
          dni:this.Nemploye[i].dni||0,
          name:this.Nemploye[i].name||"",
          phone:this.Nemploye[i].phone||0,
          i:i+1
        })
        



      }
    })
  }


  actualizar (){
      this.getClients()
  }

  search(){
    
    // order -  cate - search
    let order= (<HTMLInputElement>document.getElementById("order")).value
    let cate= (<HTMLInputElement>document.getElementById("cate")).value
    let search= (<HTMLInputElement>document.getElementById("search")).value
    let or=order.split("/")
    this.userService.getUsersSearch(search,1,1000,or[0],Number(or[1]),localStorage.getItem("shop")||"").subscribe((res)=>{
      this.Nemploye= res as User[]
      this.employee=[]
      for (let i=0; i< this.Nemploye.length ;i++){
        this.employee.push({
          id:this.Nemploye[i]._id||"",
          email:this.Nemploye[i].email||"",
          dni:this.Nemploye[i].dni||0,
          name:this.Nemploye[i].name||"",
          phone:this.Nemploye[i].phone||0,
          i:i+1
        })
      }

      
    })
    

  }

  // ! ----------- Paneles -----------

  rara(op:number) {
    let a=document.querySelector(".inf")?.children[0].children[op*2].children[0].children[0]
    if(a?.classList.contains("noocult")){
      a.classList.remove("noocult")
    }else{
      a?.classList.add("noocult")
    }
  }

  add_view(){
    this.clear_employee()
    this.update=false
    let background= document.getElementById("background_panel")
    let panel= document.getElementById("panel")
    background?.classList.remove("oculto")
    panel?.classList.remove("oculto")
  }


  close(){
    let background= document.getElementById("background_panel")
    let panel= document.getElementById("panel")
    background?.classList.add("oculto")
    panel?.classList.add("oculto")
  }


  // ! ----------- Clients -----------

  create_employee(){
    let name= (<HTMLInputElement>document.getElementById("name_employee")).value
    let password= (<HTMLInputElement>document.getElementById("password_employee")).value
    let email= (<HTMLInputElement>document.getElementById("email_employee")).value
    let phone= (<HTMLInputElement>document.getElementById("phone_employee")).value
    let dni= (<HTMLInputElement>document.getElementById("dni_employee")).value
    let permissions=[]
    let actualp=[1, 3 ,8 ,7 ,9 ,11, 10, 0]
    for (let i of actualp ){
      let p= (<HTMLInputElement>document.getElementById("p"+i)).checked
      if(p==true){
        permissions.push(i)
      }
    }
    if (permissions.includes(0)){
      permissions=[0,1,2,3,4,5,6,7,8,9,10,11]
    }
    let shop={
      id:localStorage.getItem("shop")||"",
      permissions:permissions||[]
    }
    let prueba=new User(undefined,email,password,Number(dni),name,undefined,Number(phone),undefined,shop,undefined)
    delete prueba._id ;
    delete prueba.city;
    delete prueba.verified;
    delete prueba.ips;
    if(this.verifyEmployee(name,email,password,dni,phone)){
      this.userService.postEmployee(prueba,localStorage.getItem("shop")||"").subscribe(res=>{
        this.actualizar()
        alert('Empleado creado')
      })
    }
  }

  verifyEmployee(name: string,email: string,password: string,dni : string,phone: string): boolean {
    if (!this.verify('Nombre', name, 2, 100, 'string')) {return false;}
    if (!this.verify('Contraseña', password, 2, 100, 'string')){return false;}
    if (!this.verify('Correo',email , 2, 100, 'string')){return false;}
    if (!this.verify('Celular', phone, 2, 100, 'string')){return false;}
    if (!this.verify('Identificacion', dni, 2, 100, 'string')){return false;}
    return true;
  }


  update_employee(){
    let idc= (<HTMLInputElement>document.getElementById("id_employee")).value
    let name= (<HTMLInputElement>document.getElementById("name_employee")).value
    let password= (<HTMLInputElement>document.getElementById("password_employee")).value
    let email= (<HTMLInputElement>document.getElementById("email_employee")).value
    let phone= (<HTMLInputElement>document.getElementById("phone_employee")).value
    let dni= (<HTMLInputElement>document.getElementById("dni_employee")).value
    let permissions=[]
    let actualp=[1, 3 ,8 ,7 ,9 ,11, 10, 0]
    for (let i of actualp ){
      let p= (<HTMLInputElement>document.getElementById("p"+i)).checked
      if(p==true){
        permissions.push(i)
      }
    }
    if (permissions.includes(0)){
      permissions=[0,1,2,3,4,5,6,7,8,9,10,11]
    }
    let shop={
      id:localStorage.getItem("shop")||"",
      permissions:permissions||[]
    }
    let prueba=new User(undefined,email,password,Number(dni),name,undefined,Number(phone),undefined,shop,undefined)
    delete prueba._id ;
    delete prueba.city;
    delete prueba.verified;
    delete prueba.ips;
    if(this.verifyEmployee(name,email,password,dni,phone)){
      this.userService.putUser(prueba,idc,localStorage.getItem("shop")||"").subscribe(res=>{
        this.actualizar()
        alert('Empleado actualizado')
      })
    }


  }



  

  delete_employee(id:string){
    this.userService.deleteUser(id,localStorage.getItem("shop")||"").subscribe(res=>{
      this.actualizar()
      alert('Empleado Eliminado')
    })
  }



  clear_employee(){
    let idc= (<HTMLInputElement>document.getElementById("id_employee"))
    idc.value = ""
    let name= (<HTMLInputElement>document.getElementById("name_employee"))
    name.value = ""
    let email= (<HTMLInputElement>document.getElementById("email_employee"))
    email.value = ""
    let address= (<HTMLInputElement>document.getElementById("address_employee"))
    address.value = ""
    let phone= (<HTMLInputElement>document.getElementById("phone_employee"))
    phone.value = ""
    let dni= (<HTMLInputElement>document.getElementById("dni_employee"))
  }
    
  refill_employee(id:string){
    this.add_view()
    let x= this.Nemploye.find(x=>x._id==id)
    let idc= (<HTMLInputElement>document.getElementById("id_employee"))
    idc.value = x?._id||""
    let name= (<HTMLInputElement>document.getElementById("name_employee"))
    name.value = x?.name||""
    let email= (<HTMLInputElement>document.getElementById("email_employee"))
    email.value = x?.email||""
    let address= (<HTMLInputElement>document.getElementById("address_employee"))
    //address.value = x?.address||""
    let phone= (<HTMLInputElement>document.getElementById("phone_employee"))
    phone.value = x?.phone.toString()||""
    let dni= (<HTMLInputElement>document.getElementById("dni_employee"))
    if (!x?.dni == undefined){
      dni.value = x?.dni.toString()||""
    }

    this.update=true

    let actualp=[1, 3 ,8 ,7 ,9 ,11, 10, 0]
    for (let i of actualp ){
    if(x?.shop.permissions?.includes(i)){
      let p= (<HTMLInputElement>document.getElementById("p"+i))
      p.checked  = true
    }}

  }

  resolveClients(op:Number){
    if (op==0){
      this.create_employee()
    }else {
      this.update_employee()
    }
  }


}



