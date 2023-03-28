export class Reserve {
  _id: string;
  time: string;
  date: string;
  workstationid: string;
  service: {
    id?: string;
    name?: string;
  };
  client: {
    id?: string;
    dni?: number;
    name?: string;
  };
  shopid: string;

  constructor(
    _id: string = "",
    time: string = "",
    date: string = "",
    workstationid: string = "",
    service: { id?: string; name?: string } = {},
    client: { id?: string; dni?: number; name?: string } = {},
    shopid: string = ""
  ) {
    this._id = _id;
    this.time = time;
    this.date = date;
    this.workstationid = workstationid;
    this.service = service;
    this.client = client;
    this.shopid = shopid;
  }
}