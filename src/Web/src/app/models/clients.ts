export class Clients {
  _id?:string;
  email?: string;
  dni?: number;
  name?: string;
  address?: string;
  phone?: number;
  points?: number;
  sells?: Array<{
    id: string;
    price: number;
    points: number;
  }>;
  shopid?: string;

  constructor(
    _id:string="",
    email: string = "",
    dni: number = 0,
    name: string = "",
    address: string = "",
    phone: number = 0,
    points: number = 0,
    sells: Array<{ id: string; price: number; points: number }> = [],
    shopid: string = ""
  ) {
    this._id=_id;
    this.email = email;
    this.dni = dni;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.points = points;
    this.sells = sells;
    this.shopid = shopid;
  }
}



