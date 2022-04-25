const Joi = require('joi');
function validateQuestionBank(bean) {
  const schema = Joi.object({
    name: Joi.string().min(1).required().label("Name"),
    createdAt:Joi.date().label("Created At")
  });
  return schema.validate(bean);
}
exports.validateQuestionBank = validateQuestionBank;