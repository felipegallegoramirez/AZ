export class ServiceCategory {
  _id?: string;
  name?: string;
  listserviceid?: Array<string>;
  shopid?: string;

  constructor(
    _id: string = "",
    name: string = "",
    listserviceid: Array<string> = [],
    shopid: string = ""
  ) {
    this._id = _id;
    this.name = name;
    this.listserviceid = listserviceid;
    this.shopid = shopid;
  }
}