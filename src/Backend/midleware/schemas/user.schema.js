const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const dni = Joi.number().integer().min(0).max(9999999999);
const password = Joi.string().min(8).max(20);
const name = Joi.string().min(8).max(20);
const city = Joi.string().min(5).max(20)
const phone = Joi.number().integer().min(0).max(9999999999)

const createUserSchema = Joi.object({
  email: email.required(),
  dni: dni.required(),
  password: password.required(),
  name: name.required(),
  city: city.required(),
  phone: phone.required(),
});
const LoginUserSchema  = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  dni: dni,
  password: password,
  city: city,
  phone: phone,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, LoginUserSchema }
