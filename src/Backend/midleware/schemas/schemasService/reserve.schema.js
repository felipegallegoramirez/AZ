const Joi = require('joi');
//! SubStructurs

const idclient = Joi.string();
const dniclient = Joi.number().integer().min(0).max(9999999999);
const nameclient = Joi.string().min(8).max(20);

const clientSchema = Joi.object({
  id: idclient.required(),
  dni: dniclient.required(),
  name: nameclient.required(),
});


const id = Joi.string();
const workstationid = Joi.string();
const time = Joi.string();
const date = Joi.string();
const shopid = Joi.string();


const createReserveSchema = Joi.object({
  workstationid: workstationid.required(),
  time: time.required(),
  date: date.required(),
  client: clientSchema.required(),
  shopid: shopid.required(),
});

const updateReserveSchema = Joi.object({
  workstationid: workstationid,
  time: time,
  date: date,
  client: clientSchema,
  shopid: shopid,
});

const getReserveSchema = Joi.object({
  id: id.required(),
});

module.exports = { createReserveSchema, updateReserveSchema, getReserveSchema,  }
