export class Service {
  _id?: string;
  name?: string;
  category?: string;
  price?: number;
  points?: number;
  shopid?: string;

  constructor(
    _id: string = "",
    name: string = "",
    category: string = "",
    price: number = 0,
    points: number = 0,
    shopid: string = ""
  ) {
    this._id = _id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.points = points;
    this.shopid = shopid;
  }
}