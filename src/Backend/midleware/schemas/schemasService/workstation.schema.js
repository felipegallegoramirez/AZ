const Joi = require('joi');

//! SubStructurs

const idemployee = Joi.string();
const dniemployee = Joi.number().integer().min(0).max(9999999999);
const nameemployee = Joi.string().min(8).max(20);

const employeeSchema = Joi.object({
  id: idemployee.required(),
  dni: dniemployee.required(),
  name: nameemployee.required(),
});

const idservice = Joi.string();
const nameservice = Joi.string().min(8).max(20);

const serviceSchema = Joi.object({
  idservice: idservice.required(),
  nameservice: nameservice.required(),
});


const id = Joi.string();
const blocked = Joi.array().items(Joi.string());
const shopid = Joi.string();

const createWorkStationSchema = Joi.object({
  employee: employeeSchema.required(),
  blocked: blocked.required(),
  serviceSchema: serviceSchema.required(),
  shopid: shopid.required(),
});

const updateWorkStationSchema = Joi.object({
  employee: employeeSchema,
  blocked: blocked,
  serviceSchema: serviceSchema,
  shopid: shopid,
});

const getWorkStationSchema = Joi.object({
  id: id.required(),
});

module.exports = { createWorkStationSchema, updateWorkStationSchema, getWorkStationSchema,  }
