import { Component, OnInit } from '@angular/core';
import {Clients} from'../../../models/clients'
import { ClientsService} from "../../../services/clients.service"
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css'],
  providers: [ClientsService]
})
export class UserManagmentComponent implements OnInit {

    constructor( private clientsService:ClientsService) { }

  
    clients: Array<{
      id:string;
      email: string;
      dni: number;
      name: string;
      address: string;
      phone: number;
      points: number;
      sells: Array<{
        id: string;
        price: number;
        points: number;
      }>;
      shopid: string;
      i:number
    
    }> =[]
  
  
  
    categorydata:boolean=true
    categoryselect:boolean=false
    edit:boolean=false
    update:boolean=false
  
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
  
    verifyClient(name: string,email: string,address: string,dni : string,phone: string): boolean {
      if (!this.verify('Nombre', name, 2, 100, 'string')) {return false;}
      if (!this.verify('Direccion', address, 2, 100, 'string')){return false;}
      if (!this.verify('Correo',email , 2, 100, 'string')){return false;}
      if (!this.verify('Celular', phone, 2, 100, 'string')){return false;}
      if (!this.verify('Identificacion', dni, 2, 100, 'string')){return false;}
      return true;
    }
  
    // * Variable's preview photo
    file:File[]=[]
    imageDefatult:string=environment.backend+"/public/images/basic.png"
    photoSelected: Array<string> | ArrayBuffer | any =[this.imageDefatult,this.imageDefatult] ;
  
    ngOnInit(): void {
      this.actualizar()
    }
  
  
  
    editar(){
      this.edit= this.edit==true?false:true
    }
  
    onPhotoSelected(event: any,id:number): void {
      if (event.target.files && event.target.files[0]) {
        this.file[id] = <File>event.target.files[0];
        // image preview
        const reader = new FileReader();
        reader.onload = e => this.photoSelected[id] = reader.result;
        reader.readAsDataURL(this.file[id]);
      }
    }
  
  
    getClients(){
      this.clients=[]
      this.clientsService.getClientss().subscribe((res) =>{
  
        let data = res as Clients[]
        this.clients=[]
        for (let i=0; i< data.length ;i++){
          this.clients.push({
            id:data[i]._id||"",
            email:data[i].email||"",
            dni:data[i].dni||0,
            name:data[i].name||"",
            address:data[i].address||"",
            phone:data[i].phone||0,
            points: data[i].points||0,
            sells: data[i].sells || [],
            shopid: data[i].shopid || "",
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
      this.clientsService.getClientSearch(search,1,1000,or[0],Number(or[1])).subscribe((res)=>{
        let data = res as Clients[]
        this.clients=[]
        for (let i=0; i< data.length ;i++){
          this.clients.push({
            
            id:data[i]._id||"",
            email:data[i].email||"",
            dni:data[i].dni||0,
            name:data[i].name||"",
            address:data[i].address||"",
            phone:data[i].phone||0,
            points: data[i].points||0,
            sells: data[i].sells || [],
            shopid: data[i].shopid || "",
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
      this.clear_client()
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

    create_client(){
      let name= (<HTMLInputElement>document.getElementById("name_client")).value
      let email= (<HTMLInputElement>document.getElementById("email_client")).value
      let address= (<HTMLInputElement>document.getElementById("address_client")).value
      let phone= (<HTMLInputElement>document.getElementById("phone_client")).value
      let dni= (<HTMLInputElement>document.getElementById("dni_client")).value


      let data = new Clients(undefined,email,Number(dni),name,address,Number(phone),undefined,undefined)
      delete data._id;
  
      if(this.verifyClient(name,email,address,dni,phone)){
        this.clientsService.postClients(data).subscribe((res)=>{
          this.getClients();
          alert('Cliente creado')
        })
      }

      
    }
  
    get_client(){
  
    }

    update_client(){
      let idc= (<HTMLInputElement>document.getElementById("id_client")).value
      let name= (<HTMLInputElement>document.getElementById("name_client")).value
      let email= (<HTMLInputElement>document.getElementById("email_client")).value
      let address= (<HTMLInputElement>document.getElementById("address_client")).value
      let phone= (<HTMLInputElement>document.getElementById("phone_client")).value
      let dni= (<HTMLInputElement>document.getElementById("dni_client")).value
      let data = new Clients(undefined,email,Number(dni),name,address,Number(phone),undefined,undefined)
      delete data._id;
  
      if(this.verifyClient(name,email,address,dni,phone)){
        this.clientsService.putClients(data,idc).subscribe((res)=>{
          this.getClients();
          alert('Cliente actualizado')
        })
        this.getClients();
      }

  
  
    }
  
    delete_client(id:string){
      this.clientsService.deleteClients(id).subscribe((res)=>{this.getClients();
      alert('Cliente eliminado')})
    }
  
  

    clear_client(){
      let idc= (<HTMLInputElement>document.getElementById("id_client"))
      idc.value = ""
      let name= (<HTMLInputElement>document.getElementById("name_client"))
      name.value = ""
      let email= (<HTMLInputElement>document.getElementById("email_client"))
      email.value = ""
      let address= (<HTMLInputElement>document.getElementById("address_client"))
      address.value = ""
      let phone= (<HTMLInputElement>document.getElementById("phone_client"))
      phone.value = ""
      let dni= (<HTMLInputElement>document.getElementById("dni_client"))
    }
      
    refill_client(id:string){
      this.add_view()
      let x= this.clients.find(x=>x.id==id)
      let idc= (<HTMLInputElement>document.getElementById("id_client"))
      idc.value = x?.id||""
      let name= (<HTMLInputElement>document.getElementById("name_client"))
      name.value = x?.name||""
      let email= (<HTMLInputElement>document.getElementById("email_client"))
      email.value = x?.email||""
      let address= (<HTMLInputElement>document.getElementById("address_client"))
      address.value = x?.address||""
      let phone= (<HTMLInputElement>document.getElementById("phone_client"))
      phone.value = x?.phone.toString()||""
      let dni= (<HTMLInputElement>document.getElementById("dni_client"))
      dni.value = x?.dni.toString()||""
      this.update=true
    }

    resolveClients(op:Number){
      if (op==0){
        this.create_client()
      }else {
        this.update_client()
      }
    }
  
  
}
