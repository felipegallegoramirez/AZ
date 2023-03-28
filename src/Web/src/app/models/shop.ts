export class Shop {
  _id?: string;
  email?: string;
  runt?: number;
  name?: string;
  address?: string;
  ownerid?: string;
  employeeid?: Array<string>;

  constructor(
    _id: string = "",
    email: string = "",
    runt: number = 0,
    name: string = "",
    address: string = "",
    ownerid: string = "",
    employeeid: Array<string> = []
  ) {
    this._id = _id;
    this.email = email;
    this.runt = runt;
    this.name = name;
    this.address = address;
    this.ownerid = ownerid;
    this.employeeid = employeeid;
  }
}