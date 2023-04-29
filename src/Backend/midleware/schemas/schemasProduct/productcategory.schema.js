const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const listproductid = Joi.array().items(Joi.string());
const shopid = Joi.string();
const images = Joi.any();
const image = Joi.string();


const createPCategorySchema = Joi.object({
  _id:id,
  name: name,
  images: images,
  shopid: shopid,
  listproductid:listproductid,
});

const updatePCategorySchema = Joi.object({
  name: name,
  listproductid: listproductid,
  images:images,
  image:image,
  shopid: shopid,
});

const getPCategorySchema = Joi.object({
  id: id,
  shopid: shopid,
});

module.exports = { createPCategorySchema, updatePCategorySchema, getPCategorySchema,  }
