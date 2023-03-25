const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const runt = Joi.number().integer().min(0).max(9999999999);
const name = Joi.string().min(8).max(20);
const addres = Joi.string().min(5).max(20)
const ownerid = Joi.string();
const employeeid = Joi.array().items(Joi.string());

const createShopSchema = Joi.object({
  email: email.required(),
  runt: runt.required(),
  name: name.required(),
  addres: addres.required(),
  ownerid: ownerid.required(),
  employeeid: employeeid.required(),
});


const updateShopSchema = Joi.object({
  email: email,
  runt: runt,
  name: name,
  addres: addres,
  ownerid: ownerid,
  employeeid: employeeid,
});

const getShopSchema = Joi.object({
  id: id.required(),
});

module.exports = { createShopSchema, updateShopSchema, getShopSchema}
