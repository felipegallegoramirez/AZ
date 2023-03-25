const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const listproductid = Joi.array().items(Joi.string());
const shopid = Joi.string();


const createPCategorySchema = Joi.object({
  name: name.required(),
  listproductid: listproductid.required(),
  shopid: shopid.required(),
});

const updatePCategorySchema = Joi.object({
  name: name,
  listproductid: listproductid,
  shopid: shopid,
});

const getPCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createPCategorySchema, updatePCategorySchema, getPCategorySchema,  }
