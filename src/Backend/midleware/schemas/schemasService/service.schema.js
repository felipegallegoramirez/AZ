const Joi = require('joi');



const id = Joi.string();
const servicename = Joi.string();
const category = Joi.string();
const price = Joi.number().min(0).max(100000000000000);
const points = Joi.number().min(0).max(10000000);
const shopid = Joi.string();

const createServiceSchema = Joi.object({
  name: servicename.required(),
  category: category.required(),
  price: price.required(),
  points: points.required(),
  shopid: shopid.required(),
});

const updateServiceSchema = Joi.object({
  name: servicename,
  category: category,
  price: price,
  points: points,
  shopid: shopid,
});

const getSrviceSchema = Joi.object({
  id: id.required(),
});

module.exports = { createServiceSchema, updateServiceSchema, getSrviceSchema,  }
