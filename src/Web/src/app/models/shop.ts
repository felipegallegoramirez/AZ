export class Shop {
  _id?: string;
  email?: string;
  nit?: string;
  name?: string;
  address?: string;
  ownerid?: string;
  employeeid?: Array<string>;
  phone?:number;

  constructor(
    _id: string = "",
    email: string = "",
    nit: string = "",
    name: string = "",
    address: string = "",
    ownerid: string = "",
    employeeid: Array<string> = [],
    phone: number = 0,
  ) {
    this._id = _id;
    this.email = email;
    this.nit = nit;
    this.name = name;
    this.address = address;
    this.ownerid = ownerid;
    this.employeeid = employeeid;
    this.phone = phone
  }
}