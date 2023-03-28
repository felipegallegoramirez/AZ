export class Inventory {
  _id?: string;
  code?: string;
  productname?: string;
  count?: string;
  category?: string;
  price?: number;
  points?: number;
  shopid?: string;

  constructor(
    _id:string = "",
    code: string = "",
    productname: string = "",
    count: string = "",
    category: string = "",
    price: number = 0,
    points: number = 0,
    shopid: string = ""
  ) {
    this._id=_id;
    this.code = code;
    this.productname = productname;
    this.count = count;
    this.category = category;
    this.price = price;
    this.points = points;
    this.shopid = shopid;
  }
}