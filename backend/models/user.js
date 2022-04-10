const jwt = require('jsonwebtoken');
const Joi = require('joi');
function generateAuthToken({id,name,email,role}) {
  const token = jwt.sign({
    id: id,
    name: name,
    email:email,
    role:role,
  }, "talha");
  return token;
}
exports.generateAuthToken = generateAuthToken;
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.number().min(1).max(3).required()
  });
  return schema.validate(user);
}
exports.validate = validateUser;