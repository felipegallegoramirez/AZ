const Joi = require('joi');


const idsells = Joi.string();
const category = Joi.string();
const code  = Joi.number().integer().min(0).max(999999999999999999);
const count  = Joi.number().integer().min(0).max(999999999999999999);
const price  = Joi.number().integer().min(0).max(999999999999999999);
const totalprice  = Joi.number().integer().min(0).max(999999999999999999);
const productSchema = Joi.object({
  id: idsells.required(),
  code: code.required(),
  category: category.required(),
  count: count.required(),
  price: price.required(),
  totalprice: totalprice.required(),
});

const id = Joi.string();
const total = Joi.number().integer().min(0).max(9999999999);
const name = Joi.string();
const dni = Joi.string();
const phone = Joi.number().integer().min(0).max(9999999999);
const address = Joi.string();
const lastdate = Joi.string();
const nextdate = Joi.string();
const shopid = Joi.string();


const createDistributorSchema = Joi.object({
  _id:id,
  product: Joi.array().items(productSchema),
  total:total.required(),
  name:name.required(),
  dni:dni.required(),
  phone:phone.required(),
  address:address.required(),
  lastdate:lastdate,
  nextdate:nextdate,
  shopid: shopid,
});


const updateDistributorSchema = Joi.object({
  _id:id,
  product: Joi.array().items(productSchema),
  total:total,
  name:name,
  dni:dni,
  phone:phone,
  address:address,
  lastdate:lastdate,
  nextdate:nextdate,
  shopid: shopid,
});

const getDistributorSchema = Joi.object({
  id: id.required(),
  shopid: shopid.required(),
});

module.exports = { createDistributorSchema, updateDistributorSchema, getDistributorSchema }
