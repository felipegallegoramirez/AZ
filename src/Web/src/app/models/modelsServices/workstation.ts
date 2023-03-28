export class WorkStation {
  _id?: string;
  employee?: {
    id?: string;
    dni?: number;
    name?: string;
  };
  blocked?: string[];
  services?: {
    id?: string;
    name?: string;
  };
  shopid?: string;


  constructor(
    shopid: string = "",
    _id: string = "",
    employee: {
      id?: string;
      dni?: number;
      name?: string;
    } = {},
    blocked: string[] = [],
    services: {
      id?: string;
      name?: string;
    } = {}
  ) {
    this.shopid = shopid;
    this._id = _id;
    this.employee = employee;
    this.blocked = blocked;
    this.services = services;
  }
}
