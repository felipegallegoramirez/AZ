export class Sales {
  _id?:string;
  time?: string;
  client?: {
    id?: string;
    dni?: number;
    name?: string;
  };
  employee?: {
    id?: string;
    dni?: number;
    name?: string;
  };
  date?: string;
  product?: Array<{
    id?: string;
    name?: string;
    count?: number;
    unitarypoints?: string;
    totalpoints?: number;
    unitaryprice?: string;
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
  shopid: string;

  constructor(
    _id:string ="",
    time: string = "",
    client: {
      id?: string;
      dni?: number;
      name?: string;
    } = {},
    employee: {
      id?: string;
      dni?: number;
      name?: string;
    } = {},
    date: string = "",
    product: Array<{
      id?: string;
      name?: string;
      count?: number;
      unitarypoints?: string;
      totalpoints?: number;
      unitaryprice?: string;
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
    shopid: string= ""
  ) {
    this._id= _id;
    this.time = time;
    this.client = client;
    this.employee = employee;
    this.date = date;
    this.product = product;
    this.service = service;
    this.totalprice = totalprice;
    this.totalpoints = totalpoints;
    this.shopid = shopid;
  }
}
