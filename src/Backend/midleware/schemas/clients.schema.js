const Joi = require('joi');


const idsells = Joi.string();
const pricesells  = Joi.number().integer().min(0).max(999999999999999999);
const pointssells  = Joi.number().integer().min(0).max(999999999)

const sellsSchema = Joi.object({
  id: idsells.required(),
  price: pricesells.required(),
  points: pointssells.required(),
});

const id = Joi.string();
const email = Joi.string().email();
const dni = Joi.number().integer().min(0).max(9999999999);
const name = Joi.string().min(8).max(20);
const address = Joi.string().min(5).max(40)
const phone = Joi.number().integer().min(0).max(9999999999)
const points = Joi.number().integer().min(0).max(999999999)

const shopid = Joi.string();

const createClientsSchema = Joi.object({
  email: email.required(),
  dni: dni.required(),
  name: name.required(),
  address: address.required(),
  phone: phone.required(),
  points: points.required(),
  phone: phone.required(),
  sells: Joi.array().items(sellsSchema).required(),
  shopid: shopid.required(),
});


const updateClientsSchema = Joi.object({
  email: email,
  dni: dni,
  name: name,
  address: address,
  phone: phone,
  points: points,
  phone: phone,
  sells: Joi.array().items(sellsSchema),
  shopid: shopid,
});

const getClientsSchema = Joi.object({
  id: id.required(),
});

module.exports = { createClientsSchema, updateClientsSchema, getClientsSchema }
