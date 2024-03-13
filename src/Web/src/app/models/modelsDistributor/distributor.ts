export class Distributor {
  _id?:string;
  product?: Array<{
    id: string;
    code: string;
    category: string;
    count: number;
    price: number;
    totalprice: number;
  }>;
  total?: number;
  name?: string;
  dni?: string;
  phone?: number;
  address?: string;
  lastdate?: string;
  nextdate?: string;
  shopid?: string;

  constructor(
    _id:string= "",
    product: Array<{
      id: string,
      code: string,
      category: string,
      count: number,
      price: number,
      totalprice: number
    }> =[] ,
    total: number= 0,
    name: string= "",
    dni: string= "",
    phone: number= 0 ,
    address: string= "" ,
    lastdate: string= "",
    nextdate: string= "",
    shopid: string= "",
  ) {
    this._id=_id
    this.product=product
    this.total=total
    this.name=name
    this.dni=dni
    this.phone=phone
    this.address=address
    this.lastdate=lastdate
    this.nextdate=nextdate
    this.shopid=shopid
    

  }
}



