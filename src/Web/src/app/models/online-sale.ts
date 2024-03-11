export class Sales {
  _id?:string;
  time?: string;
  client?: {
    id?: string;
    dni?: number;
    name?: string;
    number?: string;
    address?: string;
  };
  date?: string;
  product?: Array<{
    id?: string;
    name?: string;
    count?: number;
    unitarypoints?: number;
    totalpoints?: number;
    unitaryprice?: number;
    totalprice?: number;
  }>;
  service?: Array<{
    id?: string;
    name: string;
    points?: string;
    price?: string;
    time: string;
    date: string;
  }>;
  totalprice?: number;
  totalpoints?: number;
  shopid?: string;
  option?:number;
  state?: string;
  metod?:string;

  constructor(
    _id:string ="",
    time: string = "",
    client: {
      id?: string;
      dni?: number;
      name?: string;
      number?: string;
      address?: string;
    } = {},
    date: string = "",
    product: Array<{
      id?: string;
      name?: string;
      count?: number;
      unitarypoints?: number;
      totalpoints?: number;
      unitaryprice?: number;
      totalprice?: number;
    }> = [],
    service: Array<{
      id?: string;
      name: string;
      points?: string;
      price?: string;
      time: string;
      date: string;
    }> = [],
    totalprice: number = 0,
    totalpoints: number = 0,
    shopid: string= "",
    option: number = 0,
    state: string="",
    metod:string="",
  ) {
    this._id= _id;
    this.time = time;
    this.client = client;
    this.date = date;
    this.product = product;
    this.service = service;
    this.totalprice = totalprice;
    this.totalpoints = totalpoints;
    this.shopid = shopid;
    this.option=option
    this.state=state
    this.metod=metod
  }
}
