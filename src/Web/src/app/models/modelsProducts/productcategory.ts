export class ProductCategory {
  _id?:string;
  name?: string;
  listproductid?: Array<string>;
  image?:string
  shopid?: string;

  constructor(
    _id:string ="",
    name: string = "",
    listproductid: Array<string> = [],
    image:string ="",
    shopid: string = ""
  ) {
    this._id= _id;
    this.name = name;
    this.listproductid = listproductid;
    this.image=image
    this.shopid = shopid;
  }
}