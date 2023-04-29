const Joi = require('joi');

const id = Joi.string();
const code = Joi.string();
const productname = Joi.string();
const count = Joi.number().min(0).max(10000000);
const category = Joi.string();
const price = Joi.number().min(0).max(100000000000000);
const points = Joi.number().min(0).max(10000000);
const shopid = Joi.string();
const images = Joi.any();
const image = Joi.string()


const createInventorySchema = Joi.object({
  code: code.required(),
  productname: productname.required(),
  count: count.required(),
  category: category.required(),
  price: price.required(),
  points: points.required(),
  shopid: shopid.required(),
  images: images,
});

const updateInventorySchema = Joi.object({
  code: code,
  productname: productname,
  count: count,
  category: category,
  price: price,
  points: points,
  shopid: shopid,
  images: images,
  image:image
});

const getInventorySchema = Joi.object({
  id: id.required(),
  shopid:shopid
});

module.exports = { createInventorySchema, updateInventorySchema, getInventorySchema  }
