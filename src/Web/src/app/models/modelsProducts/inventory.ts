export class Inventory {
  _id?: string;
  code?: string;
  productname?: string;
  count?: number;
  category?: string;
  price?: number;
  points?: number;
  shopid?: string;
  image?:string

  constructor(
    _id:string = "",
    code: string = "",
    productname: string = "",
    count: number = 0,
    category: string = "",
    price: number = 0,
    points: number = 0,
    shopid: string = "",
    image: string = ""
  ) {
    this._id=_id;
    this.image = image;
    this.code = code;
    this.productname = productname;
    this.count = count;
    this.category = category;
    this.price = price;
    this.points = points;
    this.shopid = shopid;
  }
}