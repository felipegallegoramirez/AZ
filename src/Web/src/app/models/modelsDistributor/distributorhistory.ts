export class DistributorHistory {
  _id?:string;
  product?: Array<{
    id: string;
    code: string;
    count: number;
    price: number;
    totalprice: number;
  }>;
  total?: number;
  name?: string;
  dni?: string;
  phone?: number;
  address?: string;
  date?: string;
  shopid?: string;

  constructor(
    _id:string= "",
    product: Array<{
      id: string,
      code: string,
      count: number,
      price: number,
      totalprice: number
    }> =[] ,
    total: number= 0,
    name: string= "",
    dni: string= "",
    phone: number= 0 ,
    address: string= "" ,
    date: string= "",
    shopid: string= "",
  ) {
    this._id=_id
    this.product=product
    this.total=total
    this.name=name
    this.dni=dni
    this.phone=phone
    this.address=address
    this.date=date
    this.shopid=shopid
    

  }
}



