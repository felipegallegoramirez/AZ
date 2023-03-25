const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const listserviceid = Joi.array().items(Joi.string());
const shopid = Joi.string();

const createSCategorySchemaSchema = Joi.object({
  name: name.required(),
  listserviceid: listserviceid.required(),
  shopid: shopid.required(),
});

const updateSCategorySchema = Joi.object({
  name: name,
  listserviceid: listserviceid,
  shopid: shopid,
});

const getSCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createSCategorySchemaSchema, updateSCategorySchema, getSCategorySchema,  }
