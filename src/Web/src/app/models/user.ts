export class User {
  _id?: string;
  email: string;
  password: string;
  dni: number;
  name: string;
  city?: string;
  phone: number;
  verified?: {
    state?: number;
    code?: number;
  };
  shop: {
    id?: string;
    permissions?: Array<number>;
  };
  ips?: Array<string>;

  constructor(
    _id :string = "",
    email: string = "",
    password: string = "",
    dni: number = 0,
    name: string = "",
    city: string = "",
    phone: number = 0,
    verified: {state?:number;code?:number;}={},
    shop: {id?: string;permissions?: Array<number>;}={},
    ips: Array<string> = []
  ) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.dni = dni;
    this.name = name;
    this.city = city;
    this.phone = phone;
    this.shop = shop;
    this.verified = verified;
    this.ips = ips;
  }
}