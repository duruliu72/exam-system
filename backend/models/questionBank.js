const Joi = require('joi');
function validateQuestionBank(bean) {
  const schema = Joi.object({
    name: Joi.string().min(1).required().label("Name"),
    take_duration: Joi.number().integer(),
    created_by: Joi.number().integer().required().label("Examine"),
    createdAt:Joi.date().label("Created At")
  });
  return schema.validate(bean);
}
exports.validateQuestionBank = validateQuestionBank;